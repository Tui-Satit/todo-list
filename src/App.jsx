import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {  
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch {
        localStorage.removeItem("tasks");
      }
  }

    return  [
    { text: "Learn React", completed: false},
    { text: "Build To-Do App", completed: false},
    { text: "Deploy to Vercel", completed: false },
  ];
});

  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
      if (!newTask.trim()) return;

      setTasks([...tasks, { text: newTask, completed: false}]);
      setNewTask("");
  };

  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter(
      (_, index) => index !== indexToDelete
    );

       setTasks(updatedTasks);
  };

  const toggleTask = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) => 
      index === indexToToggle 
      ? { ...task, completed: !task.completed }
       : task
    );
    

    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const startEdit = (index, text) => {
    setEditingIndex(index);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (!editingText.trim()) return;
  

  const updatedTasks = tasks.map((task, index) => 
     index === editingIndex
       ? {...task, text: editingText }
       : task
  );
  

  setTasks(updatedTasks);
  setEditingIndex(null);
  setEditingText("");
};

  return (
    <main className="app">
      <section className="todo-card">
        <h1>My To-Do List</h1>
     <p className="task-count">
      {tasks.filter((task) => task.completed).length} / {tasks.length} completed
     </p>
        <div className="todo-form">
          <input 
          type="text" 
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter"){
              addTask();
            }          }}
          />

          <button onClick={addTask}>
            Add
          </button>
        </div>

    <ul className="todo-list">
          {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            {editingIndex === index ? (
              <input
                className="edit-input"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveEdit();
                  }
                }}
                />
            ) : (
                <span onClick={() => toggleTask(index)}>
              {task.text}
           </span>
            )}

            <div className="task-actions">   
              {editingIndex === index ? (
             <button className="save-btn" onClick={saveEdit}
            >
              save
            </button>
              ) : (

            <button 
            className="edit-btn"
            onClick={() => startEdit(index, task.text)}
            >
              Edit
            </button>

           )}
         
          
            <button 
            className="delete-btn"
            onClick={() => deleteTask(index)}
            >
              Delete
            </button>
            </div> 
          </li>
        ))}
        </ul>
      </section>
    </main>
  )
}

export default App;
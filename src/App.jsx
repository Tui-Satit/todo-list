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

  return (
    <main className="app">
      <section className="todo-card">
        <h1>My To-Do List</h1>

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
            <span onClick={() => toggleTask(index)}>
              {task.text}
           </span>

            <button 
            className="delete-btn"
            onClick={() => deleteTask(index)}
            >
              Delete
            </button>

          </li>
        ))}
        </ul>
      </section>
    </main>
  )
}

export default App;
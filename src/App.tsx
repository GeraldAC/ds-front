import { useState } from "react";
import "./App.css";
import TaskItem from "./taskItem";

interface Task {
  text: string;
  createdAt: Date;
}

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");

  const handleAddTask = () => {
    const trimmedTask = task.trim();

    if (trimmedTask === "") {
      setError("La tarea no puede estar vacía.");
      return;
    }

    if (tasks.some((t) => t.text === trimmedTask)) {
      setError("La tarea ya existe.");
      return;
    }

    const newTask: Task = {
      text: trimmedTask,
      createdAt: new Date(),
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setError("");
  };

  const handleDeleteTask = (text: string) => {
    setTasks(tasks.filter((t) => t.text !== text));
  };

  return (
    <>
      <h1>To-Do List</h1>
      <div className="card">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nueva Tarea"
        />
        <button onClick={handleAddTask}>Agregar</button>
      </div>

      {error && <p className="error">{error}</p>}

      <hr />

      <p className="task-counter">Tareas: {tasks.length}</p>

      <ul>
        {tasks.map((t, index) => (
          <TaskItem
            key={index}
            task={t.text}
            createdAt={t.createdAt}
            onDelete={() => handleDeleteTask(t.text)}
          />
        ))}
      </ul>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./TaskList";
import { AlertCircle } from "lucide-react";

interface Task {
  text: string;
  createdAt: Date;
}

// Interfaz para los datos guardados en localStorage
interface StoredTask {
  text: string;
  createdAt: string; // En localStorage se guarda como string
}

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");
  const [initialized, setInitialized] = useState(false);

  // Cargar tareas desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        // Convertir las fechas de string a objetos Date
        const parsedTasks: Task[] = JSON.parse(storedTasks).map(
          (task: StoredTask) => ({
            text: task.text,
            createdAt: new Date(task.createdAt),
          })
        );
        setTasks(parsedTasks);
      } catch (e) {
        console.error("Error al cargar tareas del localStorage:", e);
        setError("Error al cargar tareas guardadas.");
      }
    }
    setInitialized(true);
  }, []);

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, initialized]);

  const handleAddTask = () => {
    const trimmedTask = task.trim();

    if (trimmedTask === "") {
      setError("La tarea no puede estar vacía.");
      return;
    }

    if (tasks.some((t) => t.text.toUpperCase() === trimmedTask.toUpperCase())) {
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

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index: number, newText: string, newDate: Date) => {
    const trimmedText = newText.trim();

    if (trimmedText === "") {
      setError("El texto de la tarea no puede estar vacío.");
      return;
    }

    if (
      tasks.some(
        (t, i) =>
          i !== index && t.text.toLowerCase() === trimmedText.toLowerCase()
      )
    ) {
      setError("Ya existe una tarea con ese nombre.");
      return;
    }

    const currentDate = new Date();
    if (newDate > currentDate) {
      setError("La fecha no puede ser futura.");
      return;
    }

    if (isNaN(newDate.getTime())) {
      setError("La fecha proporcionada no es válida.");
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[index] = { text: trimmedText, createdAt: newDate };
    setTasks(updatedTasks);
    setError("");
  };

  return (
    <>
      <h1>Lista de Tareas</h1>
      <div className="card">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nueva Tarea"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button onClick={handleAddTask}>Agregar</button>
      </div>

      {error && (
        <p className="error">
          <AlertCircle />
          <span>{error}</span>
        </p>
      )}

      <hr />
      <p className="task-counter">Tareas: {tasks.length}</p>

      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </>
  );
}

export default App;

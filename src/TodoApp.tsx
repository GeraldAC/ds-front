import { useState, useEffect } from "react";
import "./TodoApp.css";
import { AlertCircle } from "lucide-react";
import TodoList from "./TodoList";

interface Task {
  text: string;
  createdAt: Date;
  completed: boolean;
}

// Interfaz para los datos guardados en localStorage
interface StoredTask {
  text: string;
  createdAt: string; // En localStorage se guarda como string
}

function TodoApp() {
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
      completed: false,
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
    if (newDate < currentDate) {
      setError("La fecha no puede ser pasada.");
      return;
    }

    if (isNaN(newDate.getTime())) {
      setError("La fecha proporcionada no es válida.");
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      text: trimmedText,
      createdAt: newDate,
      completed: true,
    };
    setTasks(updatedTasks);
    setError("");
  };

  const handleToggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const user = {
    name: "Gerald Antonio Cusacani Gonzales",
    email: "200332@unsaac.edu.pe",
    role: "Estudiante de Ing. Informática y de Sistemas",
    avatar: "https://i.pravatar.cc/100?img=3", // Imagen aleatoria
  };

  return (
    <>
      <h1>Perfil de Usuario</h1>
      <div className="profile-card">
        <img src={user.avatar} alt="Avatar" className="avatar" />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>
            <strong>Rol:</strong> {user.role}
          </p>
        </div>
      </div>
      <hr />
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

      <TodoList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onToggleComplete={handleToggleComplete}
      />
    </>
  );
}

export default TodoApp;

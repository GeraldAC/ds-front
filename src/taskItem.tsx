import React from "react";

interface TaskItemProps {
  task: string;
  createdAt: Date;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, createdAt, onDelete }) => {
  const formattedDate = new Intl.DateTimeFormat("es-PE", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(createdAt));

  return (
    <li className="task-item">
      <div className="card-task">
        <div>
          <strong>{task}</strong>
          <div className="timestamp">{formattedDate}</div>
        </div>
        <button className="delete-btn" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

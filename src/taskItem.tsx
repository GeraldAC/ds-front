import React from "react";

interface TaskItemProps {
  task: string;
  createdAt: Date;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, createdAt }) => {
  const formattedDate = new Intl.DateTimeFormat("es-PE", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(createdAt));

  return (
    <li className="task-item">
      <div>
        <strong>{task}</strong>
        <div className="timestamp">{formattedDate}</div>
      </div>
    </li>
  );
};

export default TaskItem;

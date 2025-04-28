import React from 'react';

interface TaskItemProps {
  task: string;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <li className="task-item">
      <span>{task}</span>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;

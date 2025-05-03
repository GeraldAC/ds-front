import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  text: string;
  createdAt: Date;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newText: string, newDate: Date) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TaskList;

import React from "react";
import TodoItem from "./TodoItem";

interface Task {
  text: string;
  createdAt: Date;
  completed: boolean;
}

interface TodoListProps {
  tasks: Task[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newText: string, newDate: Date) => void;
  onToggleComplete: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  onDelete,
  onEdit,
  onToggleComplete,
}) => {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          index={index}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
};

export default TodoList;

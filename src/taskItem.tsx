import { Trash2 } from "lucide-react";
import React, { useState } from "react";

interface Task {
  text: string;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number, newText: string, newDate: Date) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDate, setEditDate] = useState(
    new Date(task.createdAt).toISOString().slice(0, 16)
  );

  const handleSave = () => {
    const newDate = new Date(editDate);
    onEdit(index, editText, newDate);
    setIsEditing(false);
  };

  const formattedDate = new Intl.DateTimeFormat("es-PE", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(task.createdAt));

  return (
    <li className="task-item">
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <input
            type="datetime-local"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <div className="task-edit-actions">
            <button className="save-btn" onClick={handleSave}>
              Guardar
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <div className="task-info">
            <strong>{task.text}</strong>
            <div className="timestamp">{formattedDate}</div>
          </div>
          <div className="task-actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Editar
            </button>
            <button className="delete-btn" onClick={() => onDelete(index)}>
              <Trash2 size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;

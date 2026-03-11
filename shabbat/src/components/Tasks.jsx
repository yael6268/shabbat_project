import { useState } from "react";

export const Tasks = ({ task, deleteTask, updateTask, cancelEdit }) => {
  const [isEditing, setIsEditing] = useState(task.isEditing || false);
  const [localTask, setLocalTask] = useState({
    ...task,
    original: task.original || { ...task } 
  });

  const handleSave = () => {
    updateTask({ ...localTask, isEditing: false, isNew: false });
    setIsEditing(false);
  };

  const handleCancel = () => {
    cancelEdit(localTask);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {!isEditing ? (
        <div className="task-display-row">
          <div className="task-info">
            <span className="task-name">{task.title}</span>
            <span className="task-duration">⏱️ {task.time} דקות</span>
          </div>
          <div className="button-group">
            <button onClick={() => setIsEditing(true)}>
              <span className="btn-icon">✏️</span> עריכה
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <span className="btn-icon">🗑️</span> מחק
            </button>
          </div>
        </div>
      ) : (
        <div className="edit-mode-container">
          <form className="modern-form-grid" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={localTask.title}
              onChange={e => setLocalTask({ ...localTask, title: e.target.value })}
              placeholder="שם משימה"
              className="modern-input"
            />
            <input
              type="number"
              value={localTask.time}
              onChange={e => setLocalTask({ ...localTask, time: Number(e.target.value) })}
              placeholder="דקות"
              className="modern-input small"
            />
            <select
              className="modern-select"
              value={localTask.place}
              onChange={e => setLocalTask({ ...localTask, place: e.target.value })}
            >
              <option value="basic">בסיסי</option>
              <option value="atHome">בבית</option>
              <option value="traveling">נסיעות</option>
              <option value="hospitality">אירוח</option>
            </select>
          </form>
          <div className="button-group center-btns">
            <button onClick={handleSave} className="save-btn">
              <span className="btn-icon">💾</span> שמירה
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              <span className="btn-icon">❌</span> ביטול
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export const Tasks2 = ({ task, onToggle }) => {
  return (
    <li className={`task-row ${task.status === "done" ? "checked" : ""}`}>
      <div className="task-content">
        <span className="task-name">{task.title}</span>
        <span className="task-meta">| {task.time} דקות</span>
      </div>
      
      <label className="custom-checkbox-container">
        <span>בוצע</span>
        <input
          type="checkbox"
          checked={task.status === "done"}
          onChange={onToggle}
        />
      </label>
    </li>
  );
};
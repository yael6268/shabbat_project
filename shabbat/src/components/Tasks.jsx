import { useState } from "react";

export const Tasks = ({ task, deleteTask, updateTask, cancelEdit }) => {
  const [isEditing, setIsEditing] = useState(task.isEditing || false);
  const [localTask, setLocalTask] = useState({...task,
    original: task.original || { ...task } // שמירה של ערכים מקוריים
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
    <li>
      {!isEditing ? (
        <>
          <span>{task.title}</span><br />
          <span>{task.time} דקות</span><br />
          <button onClick={() => setIsEditing(true)}>✏️ עריכה</button>
          <button onClick={() => deleteTask(task.id)}>🗑️ מחק</button>
        </>
      ) : (
        <>
      <form className="card">
          <input
            type="text"
            value={localTask.title}
            onChange={e => setLocalTask({ ...localTask, title: e.target.value })}
            placeholder="שם משימה"
          />
          <input
            type="number"
            value={localTask.time}
            onChange={e => setLocalTask({ ...localTask, time: Number(e.target.value) })}
            placeholder="זמן בדקות"
          />
          <select
            value={localTask.place}
            onChange={e => setLocalTask({ ...localTask, place: e.target.value })}
          >
            <option value="basic">בסיסי</option>
            <option value="atHome">בבית</option>
            <option value="traveling">נסיעות</option>
            <option value="hospitality">אירוח</option>
          </select>
          </form>
          <div id="buttons">
          <button onClick={handleSave} id="save">💾 שמירה</button>
          <button onClick={handleCancel} id="cancel">❌ ביטול</button>
</div>
       </>
      )}
    </li>
  );
};

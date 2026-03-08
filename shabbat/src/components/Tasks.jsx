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
        <><><li>
          <span>{task.title}</span><br />
          <span>{task.time} דקות</span><br />
          </li>
        <div id="buttons">
          <button onClick={() => setIsEditing(task.id)}>✏️ עריכה</button>
          <button onClick={() => deleteTask(task.id)}>🗑️ מחק</button>
       </div></>
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
export const Tasks2 = ({ task, onToggle }) => {
  return (
    <li>
      <span>{task.title}</span> - <span>{task.time} דקות</span>{" "}


      <label >
        בוצע:
        <input
          type="checkbox"
          checked={task.status === "done"}
          onChange={onToggle}
        />
      </label>
    </li>

  );
};


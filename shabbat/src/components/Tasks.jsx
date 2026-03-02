export const Tasks = ({ task, deleteTask, updateTask, watchToEdit }) => {
  return (
    <li>
      {!task.isEditing ? (
        <>
          <span>{task.title}</span><br />
<span>{task.time} דקות</span><br />
          <button onClick={() => watchToEdit(task.id)}>✏️ עריכה</button>
          <button onClick={() => deleteTask(task.id)}>🗑️ מחק</button><br /><br />
        </>
      ) : (
        <>
          <input
            value={task.title}
            onChange={e => updateTask(task.id, "title", e.target.value)}
            placeholder="שם משימה"
          />
          <br />
          <input
            type="number"
            value={task.time}
            onChange={e =>
              updateTask(task.id, "time", Number(e.target.value))
            }
            placeholder="זמן בדקות"
          />
          <select
            value={task.place}
            onChange={e => updateTask(task.id, "place", e.target.value)}
          >
            <option value="basic">בסיסי</option>
            <option value="atHome">בבית</option>
            <option value="traveling">נסיעות</option>
            <option value="hospitality">אירוח</option>
          </select>
          <button onClick={() => watchToEdit(task.id)}>💾 שמירה</button><br />
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


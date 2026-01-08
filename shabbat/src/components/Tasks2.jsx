export const Tasks2 = ({ task, tas, onToggle }) => {
  const t = task || tas;


  return (
  <li className={`task-item ${t?.status === "done" ? 'done' : ''}`}>
      <span>{t?.title}</span><br /><span>{t?.time} דקות</span><br />

      <label>
        <input
          type="checkbox"
          checked={t?.status === "done"}
          onChange={onToggle}
        />
      </label>
    </li>
  );
};

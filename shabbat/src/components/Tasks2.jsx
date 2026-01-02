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

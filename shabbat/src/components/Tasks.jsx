export const Tasks = ({ tas, onToggle }) => {
  return (
    <li
      style={{
        backgroundColor: tas.status === "done" ? "#f7c5e9ff" : "#9eddf8ff",
      }}
    >
      <p>כותרת: {tas.title}</p>
      <p>זמן: {tas.time}</p>
      <p> {tas.status}</p>

      <label >
        בוצע:
        <input
          type="checkbox"
          checked={tas.status === "done"}
          onChange={onToggle}
        />
      </label>
    </li>

  );
};

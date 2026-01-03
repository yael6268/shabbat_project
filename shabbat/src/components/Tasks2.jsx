export const Tasks2 = ({ task, tas, onToggle }) => {
  const t = task || tas;
    const liStyle = {
      backgroundColor: t?.status === "done" ? 'rgba(124,246,90,0.12)' : undefined,
      padding: '6px 8px',
      borderRadius: '8px'
    };
  
    return (
      <li style={liStyle}>
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

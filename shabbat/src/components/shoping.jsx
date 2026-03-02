
export const Shoping = ({ shoping, onDelete, onUpdate, onEditToggle }) => {


  return (
    <li className="shop-item">
      {!shoping.isEditing ? (
        <>
          <span>{shoping.name}</span><br />
          <button onClick={() => onEditToggle(shoping.id)}>✏️ עריכה</button>
          <button onClick={() => onDelete(shoping.id)}>🗑️ מחק</button>
          <br /><br />
        </>
      ) : (
        <>
          <input
            type="text"
            value={shoping.name}
            onChange={(e) => onUpdate(shoping.id, "name", e.target.value)}
            placeholder="שם מוצר"
          />
          <button onClick={() => onEditToggle(shoping.id)}>💾 שמירה</button>
        </>
      )}
    </li>
  );
};

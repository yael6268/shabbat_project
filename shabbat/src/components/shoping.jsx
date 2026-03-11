export const Shoping = ({ shoping, onDelete, onUpdate, onEditToggle }) => {

  return (
    <li className={`shop-item ${shoping.checked ? "checked" : ""}`}>
      {!shoping.isEditing ? (
        <>
          <span className="item-name">{shoping.name}</span>
          <div className="button-group">
            <button onClick={() => onEditToggle(shoping.id)}>
              <span className="btn-icon">✏️</span> עריכה
            </button>
            <button onClick={() => onDelete(shoping.id)}>
              <span className="btn-icon">🗑️</span> מחק
            </button>
          </div>
        </>
      ) : (
        <div className="edit-mode">
          <input
            type="text"
            value={shoping.name}
            onChange={(e) => onUpdate(shoping.id, "name", e.target.value)}
            placeholder="שם מוצר"
            className="modern-input"
          />
          <button onClick={() => onEditToggle(shoping.id)}>
            <span className="btn-icon">💾</span> שמירה
          </button>
        </div>
      )}
    </li>
  );
};

import { useState } from "react";
import { nanoid } from "nanoid";
import { Shoping } from "./Shoping";
import { Link } from "react-router-dom";
import { getAllShoping } from "../data/shoping";


const placeNames = {
  basic: "קניות  🛒",
  first: "סעודה ראשונה 🍲",
  second: "סעודה שניה 🍛",
  third: "סעודה שלישית 🥗",
  stay: "אירוח בבית משפחה 🏠",
  guest: "אירוח אורחים 🎉"
};

export const EditShoping = () => {
  const [shoping, setShoping] = useState(getAllShoping());

  // פונקציות
  const deleteProduct = (id) => {
    setShoping(shoping.filter(p => p.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setShoping(shoping.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const toggleEdit = (id) => {
    setShoping(shoping.map(p => p.id === id ? { ...p, isEditing: !p.isEditing } : p));
  };

  const addProduct = (type) => {
    const newProduct = { id: nanoid(), name: "", type, isEditing: true };
    setShoping([...shoping, newProduct]);
  };

  // קבוצות לפי סוג
  const groupedShoping = shoping.reduce((groups, p) => {
    if (!groups[p.type]) groups[p.type] = [];
    groups[p.type].push(p);
    return groups;
  }, {});

  return (
    <div className="centered-list">
      <h2>רשימת הקניות לשבת 🕯️🕯️</h2>

      {Object.entries(groupedShoping).map(([type, items]) => (
        <div key={type} className="group-box">
          <h3>{placeNames[type]}</h3>
          <ul className="shop-list">
            {items.map(item => (
              <Shoping
                key={item.id}
                shoping={item}
                onDelete={deleteProduct}
                onUpdate={updateProduct}
                onEditToggle={toggleEdit}
              />
            ))}
          </ul>
          <div className="group-actions">
            <button onClick={() => addProduct(type)}>➕ מוצר חדש</button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 8 }}>
        <Link to="/shoping-list" style={{ textDecoration: "none", color: "var(--royal)", fontWeight: 600 }}>
          הצג את כל המוצרים
        </Link>
      </div>
    </div>
  );
};

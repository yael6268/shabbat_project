import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Shoping } from "./Shoping";
import { Link } from "react-router-dom";
import { getAllShoping } from "../data/shoping";
import { useShabbat } from '../context/ShabbatContext';


const placeNames = {
  basic: "קניות  🛒",
  first: "סעודה ראשונה 🍲",
  second: "סעודה שניה 🍛",
  third: "סעודה שלישית 🥗",
  stay: "אירוח בבית משפחה 🏠",
  guest: "אירוח אורחים 🎉"
};

export const EditShoping = () => {
  const { shabbatDetails } = useShabbat();
  const [shoping, setShoping] = useState(getAllShoping());
  const [visibleShoping, setVisibleShoping] = useState([]);

  // פונקציות
  const deleteProduct = (id) => {
    setShoping(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setShoping(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const toggleEdit = (id) => {
    setShoping(prev => prev.map(p => p.id === id ? { ...p, isEditing: !p.isEditing } : p));
  };

  const addProduct = (type) => {
    const newProduct = { id: nanoid(), name: "", type, isEditing: true };
    setShoping(prev => [...prev, newProduct]);
  };

  const deriveTypes = () => {
    if (!shabbatDetails) return ['basic'];

    const meals = Array.isArray(shabbatDetails.meals)
      ? shabbatDetails.meals
      : (shabbatDetails.meals ? [shabbatDetails.meals] : []);

    const types = [];
    if (shabbatDetails.hospitality === 'ארוח') types.push('guest');
    if (shabbatDetails.place === 'נוסעים') types.push('stay');

    const mapMeal = (m) => {
      switch (m) {
        case '1': return 'first';
        case '2': return 'second';
        case '3': return 'third';
        default: return null;
      }
    };

    const mealTypes = meals.map(mapMeal).filter(Boolean);
    if (mealTypes.length > 0) {
      types.push('basic', ...mealTypes);
    }

    return types.length > 0 ? Array.from(new Set(types)) : ['basic'];
  };

  useEffect(() => {
    const typesToShow = deriveTypes();
    const filtered = Array.isArray(typesToShow) && typesToShow.length > 0
      ? shoping.filter(s => typesToShow.includes(s.type))
      : [];
    setVisibleShoping(filtered);
  }, [shabbatDetails?.meals, shabbatDetails?.place, shabbatDetails?.hospitality, shoping]);

  // קבוצות לפי סוג מתוך ה־visibleOnly
  const groupedShoping = visibleShoping.reduce((groups, p) => {
    if (!groups[p.type]) groups[p.type] = [];
    groups[p.type].push(p);
    return groups;
  }, {});

  return (
    <div className="centered-list">
      <h2>רשימת הקניות לשבת 🕯️🕯️</h2>

      {Object.entries(groupedShoping).length === 0 ? (
        <p>אין פריטים להצגה לפי הבחירות בעמוד הבית</p>
      ) : (
        Object.entries(groupedShoping).map(([type, items]) => (
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
        ))
      )}

      <div style={{ marginTop: 8 }}>
        <Link to="/shoping-list" style={{ textDecoration: "none", color: "var(--royal)", fontWeight: 600 }}>
          הצג את כל המוצרים
        </Link>
      </div>
    </div>
  );
};

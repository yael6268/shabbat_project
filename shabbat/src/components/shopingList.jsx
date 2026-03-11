import { useState, useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';
import { Shoping2 } from "./shoping2";
import { useShabbat } from '../context/ShabbatContext';
import { getAllShoping } from "../data/shoping";

export const ShopingList = () => {
  const { shabbatDetails } = useShabbat();
  const [shopings, setShopings] = useState([]);

  useEffect(() => {
    // טעינת כל המוצרים והוספת שדה checked אם לא קיים
    const all = getAllShoping().map(s => ({ ...s, checked: !!s.checked }));
    setShopings(all);
  }, []);

  // לוגיקת הסינון - קובעת אילו סוגי מוצרים להציג
  const typesToShow = useMemo(() => {
    if (!shabbatDetails) return ['basic'];

    const meals = Array.isArray(shabbatDetails.meals)
      ? shabbatDetails.meals
      : (shabbatDetails.meals ? [shabbatDetails.meals] : []);

    const types = [];
    
    if (shabbatDetails.place === 'מארחים' || shabbatDetails.hospitality === 'ארוח') types.push('guest');
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
    
    if (mealTypes.length > 0 || types.length > 0 || shabbatDetails.place === 'בבית') {
      types.push('basic', ...mealTypes);
    }

    return Array.from(new Set(types.length > 0 ? types : ['basic']));
  }, [shabbatDetails]);

  // יצירת רשימה אחת שטוחה של כל המוצרים שמתאימים
  const filteredShoping = useMemo(() => {
    return shopings.filter(s => typesToShow.includes(s.type));
  }, [shopings, typesToShow]);

  // --- החדש: חישוב מספר המוצרים שנותרו (רק אלו שלא סומנו ב-V) ---
  const remainingCount = useMemo(() => {
    return filteredShoping.filter(item => !item.checked).length;
  }, [filteredShoping]);

  const toggleChecked = (id) => {
    setShopings(prev => prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  return (
    <div className="centered-list">
      <h2 className="main-title">קניות לשבת קודש 🛒</h2>
      
      {/* --- התצוגה של המונה המעודכן --- */}
      <div className="counter-badge" style={{ marginBottom: '15px', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
        {remainingCount === 0 && filteredShoping.length > 0 ? (
          <span style={{ color: '#27ae60' }}>✅ כל הקניות הושלמו!</span>
        ) : (
          <span>נותרו עוד {remainingCount} מוצרים לקנייה</span>
        )}
      </div>

      {filteredShoping.length === 0 ? (
        <p>לא נבחרו פריטים להצגה - בדקו את הבחירות בעמוד הבית</p>
      ) : (
        <div className="list-container">
          <ul className="task-list">
            {filteredShoping.map(item => (
              <Shoping2
                key={item.id}
                shoping={item}
                // מוודאים שהסטטוס והפונקציה עוברים לרכיב הבן
                isChecked={item.checked} 
                onToggle={() => toggleChecked(item.id)}
              />
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 25, borderTop: '1px solid #eee', paddingTop: 10 }}>
        <Link to="/edit-shoping" style={{ textDecoration: 'none', color: 'var(--primary-dark)', fontWeight: 600 }}>
          ⚙️ עריכת רשימת הקניות
        </Link>
      </div>
    </div>
  );
};
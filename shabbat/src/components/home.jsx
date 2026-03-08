import { useShabbat } from '../context/ShabbatContext';
import { useState, useEffect } from 'react';
import { getBasicCooking, getFirstMeal, getSecondMeal, getThirdMeal, getDinnerWithGuests } from '../data/cook';
import { Link } from 'react-router-dom';
// import { getAllShoping } from '../data/shoping';
import { getAllShoping, getShopingTypesFromDetails } from '../data/shoping';

export const Home = () => {
  const { shabbatDetails, setShabbatDetails } = useShabbat();

  const handleInputBlur = () => {
    // אפשר כאן להוסיף כל פעולה לאחר עריכת השעה
    console.log("זמן הדלקת נרות:", shabbatDetails.time);
  }

  // removed handleApply; page recalculates automatically when details change

  const toggleMeal = (num) => {
    const key = String(num);
    setShabbatDetails(prev => {
      const meals = Array.isArray(prev.meals) ? [...prev.meals] : [];
      const idx = meals.indexOf(key);
      if (idx === -1) meals.push(key); else meals.splice(idx, 1);
      return { ...prev, meals };
    });
  };

  // remaining cooks (not prepared) shown on home
  const [remaining, setRemaining] = useState([]);
  const [visibleShoping, setVisibleShoping] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const parseTime = (t) => {
    const parts = t.split(':').map(Number);
    return parts.length === 2 ? parts[0]*60 + parts[1] : parts[0];
  };
  const deriveShopingTypes = () => {
  if (!shabbatDetails) return ['basic'];

  const meals = Array.isArray(shabbatDetails.meals)
    ? shabbatDetails.meals
    : (shabbatDetails.meals ? [shabbatDetails.meals] : []);

  const types = ['basic']; // תמיד בסיסי

  // מקום
  if (shabbatDetails.place === 'נוסעים') {
    types.push('stay');
  }

  if (shabbatDetails.place === 'מארחים') {
    types.push('guest');
  }

  // סעודות
  const mapMeal = (m) => {
    switch (m) {
      case '1': return 'first';
      case '2': return 'second';
      case '3': return 'third';
      default: return null;
    }
  };

  const mealTypes = meals.map(mapMeal).filter(Boolean);

  types.push(...mealTypes);

  return Array.from(new Set(types));
};
  useEffect(() => {
    const allMeals = [
      ...getBasicCooking(),
      ...getFirstMeal(),
      ...getSecondMeal(),
      ...getThirdMeal(),
      ...getDinnerWithGuests(),
    ];
    
    const meals = Array.isArray(shabbatDetails.meals)
      ? shabbatDetails.meals
      : (shabbatDetails.meals ? [shabbatDetails.meals] : []);
     
    const mapMeal = (m) => {
      switch (m) {
        case '1': return 'FirstMeal';
        case '2': return 'SecondMeal';
        case '3': return 'ThirdMeal';
        default: return null;
      }
    };
    const selectedTypes = meals.map(mapMeal).filter(Boolean);
    const wantsDinnerWithGuests = shabbatDetails?.hospitality === 'ארוח' || shabbatDetails?.place === 'מארחים';
    const typesToShow = (selectedTypes.length > 0 || wantsDinnerWithGuests)
      ? Array.from(new Set(['BasicCooking', ...selectedTypes, ...(wantsDinnerWithGuests ? ['DinnerWithGuests'] : [])]))
      : [];
    const preparedIds = JSON.parse(localStorage.getItem('preparedCooks') || '[]');
    const filtered = typesToShow.length > 0 ? allMeals.filter(m => typesToShow.includes(m.type)) : [];
    const notPrepared = filtered.filter(m => !preparedIds.includes(m.id));
    setRemaining(notPrepared);
    const mins = notPrepared.reduce((acc, item) => acc + parseTime(item.PreparationTime), 0);
    setRemainingTime(mins);
    console.log("selectedTypes",selectedTypes,"typesToShow", typesToShow, "preparedIds", preparedIds, "filtered", filtered, "notPrepared", notPrepared, "remainingTime", mins);
  }, [shabbatDetails?.meals, shabbatDetails?.place, shabbatDetails?.hospitality]);
 useEffect(() => {
  const allShoping = getAllShoping();
  const typesToShow = getShopingTypesFromDetails(shabbatDetails);

  const filtered = allShoping.filter(s =>
    typesToShow.includes(s.type)
  );

  setVisibleShoping(filtered);

}, [shabbatDetails?.meals, shabbatDetails?.place]);
  return (
    <>
      {shabbatDetails.time && (
        <h1>זמן הדלקת נרות: {shabbatDetails.time}</h1>
      )}

      <label htmlFor="timeShabbat">זמן כניסת שבת</label><br />
      <input
        type="time"
        name="timeShabbat"
        value={shabbatDetails.time}
        onChange={(e) =>
          setShabbatDetails({ ...shabbatDetails, time: e.target.value })
        }
        onBlur={handleInputBlur}
      /><br />

      <label htmlFor="place">היכן נמצאים?</label><br />
      <select
        name="place"
        id="place"
        value={shabbatDetails.place}
        onChange={(e) =>
          setShabbatDetails({ ...shabbatDetails, place: e.target.value })
        }
      >
        <option>בבית</option>
        <option>נוסעים</option>
        <option>מארחים</option>
      </select><br />

      <label htmlFor="countmeal">כמות סעודות</label><br />
      {/* keep as checkboxes - multi selection supported */}

      <label style={{ display: 'block', marginTop: 6 }}>
        <input type="checkbox" id="meal1" checked={Array.isArray(shabbatDetails.meals) && shabbatDetails.meals.includes('1')} onChange={() => toggleMeal(1)} />{' '}
        סעודה ראשונה
      </label>
      <label style={{ display: 'block' }}>
        <input type="checkbox" id="meal2" checked={Array.isArray(shabbatDetails.meals) && shabbatDetails.meals.includes('2')} onChange={() => toggleMeal(2)} />{' '}
        סעודה שנייה
      </label>
      <label style={{ display: 'block' }}>
        <input type="checkbox" id="meal3" checked={Array.isArray(shabbatDetails.meals) && shabbatDetails.meals.includes('3')} onChange={() => toggleMeal(3)} />{' '}
        סעודה שלישית
      </label>

      {/* <label htmlFor="hospitality">ארוח</label><br />
      <select
        name="hospitality"
        id="hospitality"
        value={shabbatDetails.hospitality}
        onChange={(e) =>
          setShabbatDetails({ ...shabbatDetails, hospitality: e.target.value })
        }
      >
        <option>ארוח</option>
        <option>לבד בבית</option>
      </select><br /> */}

      <div style={{ marginTop: 18 }}>
        <h2>⏱️ זמן נותר להכנה: {remainingTime > 0 ? `${Math.floor(remainingTime/60)}:${(remainingTime%60).toString().padStart(2,'0')}` : '0'} שעות</h2>
        <h2>מה שנשאר להכין</h2>
        {remaining.length === 0 ? (
          <p>אין פריטים להצגה — כל מה שנבחר מסומן כ"מוכן" או לא נבחרו סעודות</p>
        ) : (
          <ul>
            {remaining.map(r => (
              <li key={r.id}>{r.name} {r.PreparationTime}</li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: 8 }}>
          <Link to="/cook-list">לרשימת בישולים</Link>
        </div>
      </div>
      <div style={{ marginTop: 25 }}>
  <h2>🛒 רשימת קניות לשבת</h2>

  {visibleShoping.length === 0 ? (
    <p>אין פריטים להצגה</p>
  ) : (
    <ul>
      {visibleShoping.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )}
</div>
    </>
  );
}

import { useShabbat } from '../context/ShabbatContext';
import { useState, useEffect } from 'react';
import { getBasicCooking, getFirstMeal, getSecondMeal, getThirdMeal, getDinnerWithGuests } from '../data/cook';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { shabbatDetails, setShabbatDetails } = useShabbat();
  // when the user selects the "נוסעים" option we want
  // the meal checkboxes to become inactive
  const disableMeals = shabbatDetails.place === 'נוסעים';
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
  const [remainingTime, setRemainingTime] = useState(0);
  const [percentDone, setPercentDone] = useState(0);
  const parseTime = (t) => {
    const parts = t.split(':').map(Number);
    return parts.length === 2 ? parts[0]*60 + parts[1] : parts[0];
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
    // compute percent done
    const total = filtered.reduce((acc,item)=>acc+parseTime(item.PreparationTime),0);
    const done = total - mins;
    setPercentDone(total? Math.round((done/total)*100):0);
    console.log("selectedTypes",selectedTypes,"typesToShow", typesToShow, "preparedIds", preparedIds, "filtered", filtered, "notPrepared", notPrepared, "remainingTime", mins, "percentDone", percentDone);
  }, [shabbatDetails?.meals, shabbatDetails?.place, shabbatDetails?.hospitality]);

  // if travel is picked we should clear any previously selected meals
  useEffect(() => {
    if (disableMeals && Array.isArray(shabbatDetails.meals) && shabbatDetails.meals.length > 0) {
      setShabbatDetails(prev => ({ ...prev, meals: [] }));
    }
  }, [disableMeals, shabbatDetails.meals, setShabbatDetails]);

  return (
    <div className="container">
      {shabbatDetails.time && (
        <h1 style={{ marginBottom: 24 }}>זמן הדלקת נרות: {shabbatDetails.time}</h1>
      )}

      <div className="form-card">
        <div className="form-group">
          <label htmlFor="timeShabbat">זמן כניסת שבת</label>
          <input
            type="time"
            name="timeShabbat"
            id="timeShabbat"
            value={shabbatDetails.time}
            onChange={(e) =>
              setShabbatDetails({ ...shabbatDetails, time: e.target.value })
            }
            onBlur={handleInputBlur}
          />
        </div>

        <div className="form-group">
          <label htmlFor="place">היכן נמצאים?</label>
          <select
            name="place"
            id="place"
            value={shabbatDetails.place}
            onChange={(e) =>
              setShabbatDetails({ ...shabbatDetails, place: e.target.value })
            }
          >
            <option id='home'>בבית</option>
            <option id='travel'>נוסעים</option>
            <option id='home with guests'>מארחים</option>
          </select>
        </div>

        <div className="form-group" style={{ marginTop: 16 }}>
          <label>כמות סעודות</label>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: disableMeals ? "not-allowed" : "pointer" }}>
              <input
                type="checkbox"
                id="meal1"
                checked={Array.isArray(shabbatDetails.meals) && shabbatDetails.meals.includes('1')}
                onChange={() => !disableMeals && toggleMeal(1)}
                disabled={disableMeals}
              />
              סעודה ראשונה
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: disableMeals ? "not-allowed" : "pointer" }}>
              <input
                type="checkbox"
                id="meal2"
                checked={Array.isArray(shabbatDetails.meals) && shabbatDetails.meals.includes('2')}
                onChange={() => !disableMeals && toggleMeal(2)}
                disabled={disableMeals}
              />
              סעודה שנייה
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: disableMeals ? "not-allowed" : "pointer" }}>
              <input
                type="checkbox"
                id="meal3"
                checked={Array.isArray(shabbatDetails.meals) && shabbatDetails.meals.includes('3')}
                onChange={() => !disableMeals && toggleMeal(3)}
                disabled={disableMeals}
              />
              סעודה שלישית
            </label>
          </div>
        </div>
      </div>

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

      <div className="remaining-section">
        <h2 className="time-display">⏱️ זמן נותר להכנה: {remainingTime > 0 ? `${Math.floor(remainingTime/60)}:${(remainingTime%60).toString().padStart(2,'0')}` : '00:00'}</h2>
        <h3>מה שנשאר להכין</h3>
        <div className="remaining-list">
          {remaining.length === 0 ? (
            <p style={{ color: "#4B5563" }}>אין פריטים להצגה — כל מה שנבחר מסומן כ"מוכן" או לא נבחרו סעודות</p>
          ) : (
            <ul style={{ textAlign: "right", paddingRight: 16 }}>
              {remaining.map(r => (
                <li key={r.id} style={{ listStyle: "disc", fontSize: "0.95rem" }}>{r.name} <span style={{ fontSize: "0.85rem", color: "#999" }}>({r.PreparationTime})</span></li>
              ))}
            </ul>
          )}
          <div style={{ marginTop: 12 }}>
            <Link to="/cook-list">→ לרשימת בישולים המלאה</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

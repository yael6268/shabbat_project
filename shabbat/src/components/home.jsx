import { useShabbat } from '../context/ShabbatContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { shabbatDetails, setShabbatDetails } = useShabbat();
  const navigate = useNavigate();

  const handleInputBlur = () => {
    // אפשר כאן להוסיף כל פעולה לאחר עריכת השעה
    console.log("זמן הדלקת נרות:", shabbatDetails.time);
  }

  const handleApply = () => {
    // סמן שההגדרות הוחלו (אפשר להרחיב אם צריך לשמור במקום אחר)
    setShabbatDetails(prev => ({ ...prev, appliedAt: Date.now() }));
    // נווט לרשימת קניות - כל הרשימות שואבות את הקונטקסט ויציגו את התוכן המתאים
    // navigate('/shoping-list');

  }

  const toggleMeal = (num) => {
    const key = String(num);
    setShabbatDetails(prev => {
      const meals = Array.isArray(prev.meals) ? [...prev.meals] : [];
      const idx = meals.indexOf(key);
      if (idx === -1) meals.push(key); else meals.splice(idx, 1);
      return { ...prev, meals };
    });
  };

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

      <label htmlFor="hospitality">ארוח</label><br />
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
      </select><br />

      <button onClick={handleApply}>קבל</button>
    </>
  );
}

import { useState } from 'react';

export const Home = () => {
  const [shabbatDetails, setShabbatDetails] = useState({
    time: "",
    place: "בבית",
    meals: "3",
    hospitality: "לבד בבית"
  });

  const handleInputBlur = () => {
    // אפשר כאן להוסיף כל פעולה לאחר עריכת השעה
    console.log("זמן הדלקת נרות:", shabbatDetails.time);
  }

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
      <select
        name="countmeal"
        id="countmeal"
        value={shabbatDetails.meals}
        onChange={(e) =>
          setShabbatDetails({ ...shabbatDetails, meals: e.target.value })
        }
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select><br />

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

      <button>קבל</button>
    </>
  );
}


import { useState, useEffect } from 'react';

export const Home = () => {
    const [shabbatDetails, setShabbatDetails] = useState({
    time: "",
    place: "בבית",
    meals: "3",
    hospitality: "לבד בבית"
});
  const [displayName, setDisplayName] = useState('');
  const [time2, setTime2] = useState('');
  const [inputVisible, setInputVisible] = useState(true);
  
 const handleInputBlur = () => {
    
    setDisplayName(time2);
    setTime2('');
  }
const handleInputChange = (event) => {
    setName(event.target.value)
  }
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleInputBlur();
    }
  }

    return (<>
{shabbatDetails.time && (
  <h1>זמן הדלקת נרות: {shabbatDetails.time}</h1>
)}            <label htmlFor="time">זמן כניסת שבת</label><br />
           {   (<input type="time" name="timeShabbat" value={shabbatDetails.time}   onChange={(e) =>
    setShabbatDetails({ ...shabbatDetails, time: e.target.value })
  } onBlur={handleInputBlur} onKeyPress={handleInputKeyPress}  />)}
           {/* {inputVisible && (<input type="time" name='timeShabbat' value={timeShabbat} onChange={handleInputChange} onBlur={handleInputBlur} onKeyPress={handleInputKeyPress}  />)} */}

        <form action="onsubmit">
            {/* <label htmlFor="text">פרשת השבוע</label>
            <input type="text" id="text" /><br /> */}
           
        {/* {!inputVisible && (<span onClick={() => setInputVisible(true)}>{displayName || 'הכנס זמן'}</span>)} */}
            {/* <input type="text" id="time" /><br /> */}
            <label htmlFor="place">היכן נמצאים?</label><br />
            <select name="place" id="place">
                <option id="inHome">בבית</option>
                <option id="traveling">נוסעים</option>
            </select><br />
            <label htmlFor="countmeal">כמות סעודות</label><br />
            <select name="countmeal" id="countmeal">
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select><br />
            <label htmlFor="hospitality">ארוח</label><br />
            <select name="hospitality" id="hospitality">
                <option>ארוח</option>
                <option>לבד בבית</option>
            </select><br />
            <button>קבל</button>
        </form>
        
    </>);

}

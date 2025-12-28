
// import { useState, useEffect } from 'react';


export const Home = () => {


    return (<>
     
<form action="onsumbit">
    <label htmlFor="time">זמן כניסת שבת</label><br />
    <input type="time" id="time" /><br />
    <label htmlFor="place">היכן נמצאים?</label><br />
    <select name="place" id="place">
        <option>בבית</option>
        <option>נוסעים</option>
    </select><br />
    <label htmlFor="countmeal">כמות סעודות</label><br />
    <select name="countmeal" id="countmeal">
        <option>1</option>
        <option>2</option>
        <option>3</option>
    </select><br/>
    <label htmlFor="hospitality">ארוח</label>
 <input type="checkbox" /><br />
    <button>איפוס</button>
</form>
    </>);

}
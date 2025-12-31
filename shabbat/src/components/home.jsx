
import { useState, useEffect } from 'react';
// import {BasicShoping} from "../data/shoping"

export const Home = () => {


    return (<>

        <form action="onsumbit">
            <label htmlFor="time">זמן כניסת שבת</label><br />
            <input type="text" id="time" /><br />
            <label htmlFor="place">היכן נמצאים?</label><br />
            <select name="place" id="place">
                <option id="inHome">בבית</option>
                <option id="traveling">נוסעים</option>
            </select><br/>
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
            <button>איפוס</button>
        </form>
        {/* <button onClick="getBasicShoping()">הצגת רשימת קניות</button> */}
        
    </>);

}
// getBasicShoping = () => {
//     ShopingList()
// }   
import { use, useState } from "react";
import { getBasicCooking, getFirstMeal, getSecondMeal, getThirdMeal } from "../data/cook"
import { Cooking } from "./Cooking";
import { Link } from 'react-router-dom';
import { nanoid } from "nanoid";
// import { CookList } from "./CookList";
// import { Home } from "./Home";
// import { home } from "/home"2
export const EditCook = () => {
    const allMeals = [...getBasicCooking(), ...getFirstMeal(), ...getSecondMeal(), ...getThirdMeal()];
    const [cookies, setCookies] = useState(allMeals);
    const deleteCook = (cook) => {
        setCookies(prev => prev.filter(c => c.id !== cook.id));
    }
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isAddCook, setIsAddCook] = useState(false);

    const handleEditClick = (c) => {
        setEditingId(c.id);
        setEditData({ ...c });
    };
    const handleChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveClick = () => {
        // setCookies(cookies[cookies.findIndex(item => item.id === c.id)] = editData);
        setCookies(prev => prev.map(item => item.id === editingId ? editData : item));
        setEditingId(null);
        setEditData(null);
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditData(null);
    };
    const isAddCookFunc = () => {
        setIsAddCook(true);
    }
    const addCook = (event) => {
        setIsAddCook(false);
        event.preventDefault();
        console.log(event, event.target);
        const newCook = {
            id: nanoid(),
            name: event.target.elements.cookName.value,
            PreparationTime: event.target.elements.PreparationTime.value === "" ? '00:00' : event.target.elements.PreparationTime.value,
            status: 'start',
            type: 'NewCook'
        };
        setCookies([...cookies, newCook]);
        event.target.reset();
    }
    return (<>
        <h1>רשימת המטעמים של שבת </h1>
        <ul>
            {cookies.map((c, i) => (
                <li key={c.id}>
                    <Cooking cookName={editingId === c.id ? editingId : c} cook={c} />
                    <button onClick={() => deleteCook(c)}>מחק</button>
                    <div>
                        {editingId === c.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editData?.name ?? ""}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                                <button onClick={handleSaveClick}>שמור</button>
                                <button onClick={handleCancelClick}>ביטול</button>
                            </div>
                        ) : (
                            <div>
                                <button onClick={() => handleEditClick(c)}>עריכה</button>
                            </div>
                        )}
                    </div>
                    {/* <button onClick={() => addCook(c, addNewCook)}>הוסף תבשיל</button> */}
                </li>

            ))}
        </ul>
        <div>
            {isAddCook ?
                <form onSubmit={addCook}>
                    <input
                        type="text"
                        name="cookName"
                        placeholder="הכנס שם תבשיל"
                       
                    />
                    <input
                        type="time"
                        name="PreparationTime"
                        placeholder="הכנס זמן הכנה בדקות"
                       
                    />
                    <br />
                    <button type="submit">שמירה </button>
                    <button onClick={() => setIsAddCook(false)}>ביטול </button>
                </form> : null}
            <button onClick={() => isAddCookFunc()}>הוסף תבשיל</button>
        </div>
        <ul>       
                <Link to="/cook-list">  לחזרה לעריכת מוצרים</Link>
        </ul>
    </>)
}
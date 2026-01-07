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
    const addCook = (event,type) => {
        setIsAddCook(false);
        event.preventDefault();
        console.log("type:",type);
        console.log("event:",event);        
        const newCook = {
            id: nanoid(),
            name: event.target.elements.cookName.value,
            PreparationTime: event.target.elements.PreparationTime.value === "" ? '00:00' : event.target.elements.PreparationTime.value,
            status: 'start',
            type: type
        };
        setCookies([...cookies, newCook]);
        event.target.reset();
    }
    const groupedCooks = cookies.reduce((groups, cook) => {
        if (!groups[cook.type]) groups[cook.type] = [];
        groups[cook.type].push(cook);
        return groups;
    }, {});
    return (<>
        <h1>רשימת המטעמים של שבת </h1>
        {Object.entries(groupedCooks).map(([type, cooksByType]) => (
            <div key={type} className="group-box">
                <h3>{type}</h3>
                <ul className="cook-list centered-list">
                    {cooksByType.map((c, i) => (
                        <li key={c.id}>
                            <Cooking cookName={editingId === c.id ? editingId : c} cook={c} />
                            <div>
                                {editingId === c.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editData?.name ?? ""}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                        />
                                        <input
                                            type="time"
                                            value={editData?.PreparationTime ?? ""}
                                            onChange={(e) => handleChange("PreparationTime", e.target.value)}
                                        />
                                        <button onClick={handleSaveClick}>שמור</button>
                                        <button onClick={handleCancelClick}>ביטול</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={() => deleteCook(c)}> מחק</button> <br />
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
                        <form onSubmit={(e) => addCook(e, type)}>
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
            </div>))}

        <ul>
            <Link to="/cook-list">לרשימת בישולים</Link>
        </ul>
    </>)
}
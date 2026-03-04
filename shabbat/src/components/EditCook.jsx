import { useState } from "react";
import { getBasicCooking, getDinnerWithGuests, getFirstMeal, getSecondMeal, getThirdMeal } from "../data/cook"
import { Cooking } from "./Cooking";
import { Link } from 'react-router-dom';
import { nanoid } from "nanoid";
import { useShabbat } from '../context/ShabbatContext';

export const EditCook = () => {
    const allMeals = [...getBasicCooking(), ...getFirstMeal(), ...getSecondMeal(), ...getThirdMeal(), ...getDinnerWithGuests()];
    const [cookies, setCookies] = useState(allMeals);
    const { shabbatDetails } = useShabbat();
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

    const deriveTypes = () => {
        console.log("Deriving types based on shabbatDetails:", shabbatDetails);
        
      if (!shabbatDetails) return null;
      const meals = Array.isArray(shabbatDetails.meals)
        ? shabbatDetails.meals
        : (shabbatDetails.meals ? [shabbatDetails.meals] : []);
    //   if (meals.length === 0) {
    //     // no selection -> show all available types
    //     // return Array.from(new Set(cookies.map(c => c.type)));
    //     return null;
    //   }
      const mapMeal = (m) => {
        switch (m) {
          case '1': return 'FirstMeal';
          case '2': return 'SecondMeal';
          case '3': return 'ThirdMeal';
          default: return null;
        }
      };
      const selectedTypes = meals.map(mapMeal).filter(Boolean);

      // include DinnerWithGuests when hospitality is 'ארוח' or place is 'מארחים'
      const extra = [];
      if (shabbatDetails.hospitality === 'ארוח' || shabbatDetails.place === 'מארחים') extra.push('DinnerWithGuests');

      // if nothing selected and no hospitality, show nothing
      if (selectedTypes.length === 0 && extra.length === 0) return null;

      // always include BasicCooking when there's any selection
      return Array.from(new Set(['BasicCooking', ...selectedTypes, ...extra]));
    };

    const typesToShow = deriveTypes();
    const cookiesToDisplay = Array.isArray(typesToShow) && typesToShow.length > 0 
      ? cookies.filter(c => typesToShow.includes(c.type))
      : [];

    const groupedCooks = cookiesToDisplay.reduce((groups, cook) => {
        if (!groups[cook.type]) groups[cook.type] = [];
        groups[cook.type].push(cook);
        return groups;
    }, {});
    return (<>
    <div className="cook-list">
        <h1>רשימת המטעמים של שבת </h1>
        {Object.entries(groupedCooks).map(([type, cooksByType]) => (
            <div key={type} >
                <h3>{type}</h3>
                <ul className="cook-list">
                    {cooksByType.map((c, i) => (
                        <li key={c.id} >
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
                                        <button onClick={handleSaveClick}>💾 שמור</button>
                                        <button onClick={handleCancelClick}>ביטול</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={() => deleteCook(c)}> 🗑️ מחק</button> <br />
                                        <button onClick={() => handleEditClick(c)}>✏️ עריכה</button>
                                    </div>
                                )}
                            </div>
                            {/* <button onClick={() => addCook(c, addNewCook)}>הוסף תבשיל</button> */}
                        </li>

                    ))}
                </ul>
                <div >
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
    </div>
    </>)
}
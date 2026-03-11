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
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isAddCook, setIsAddCook] = useState(false);

    const deleteCook = (cook) => {
        setCookies(prev => prev.filter(c => c.id !== cook.id));
    }

    const handleEditClick = (c) => {
        setEditingId(c.id);
        setEditData({ ...c });
    };

    const handleChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveClick = () => {
        setCookies(prev => prev.map(item => item.id === editingId ? editData : item));
        setEditingId(null);
        setEditData(null);
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditData(null);
    };

    const addCook = (event, type) => {
        event.preventDefault();
        const newCook = {
            id: nanoid(),
            name: event.target.elements.cookName.value,
            PreparationTime: event.target.elements.PreparationTime.value === "" ? '00:00' : event.target.elements.PreparationTime.value,
            status: 'start',
            type: type
        };
        setCookies([...cookies, newCook]);
        setIsAddCook(false);
    }

    const deriveTypes = () => {
      if (!shabbatDetails) return null;
      const meals = Array.isArray(shabbatDetails.meals) ? shabbatDetails.meals : (shabbatDetails.meals ? [shabbatDetails.meals] : []);
      
      const mapMeal = (m) => {
        switch (m) {
          case '1': return 'FirstMeal';
          case '2': return 'SecondMeal';
          case '3': return 'ThirdMeal';
          default: return null;
        }
      };
      const selectedTypes = meals.map(mapMeal).filter(Boolean);
      const extra = [];
      if (shabbatDetails.hospitality === 'ארוח' || shabbatDetails.place === 'מארחים') extra.push('DinnerWithGuests');
      if (selectedTypes.length === 0 && extra.length === 0) return null;
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

    return (
        <div className="cook-list-container centered-list" dir="rtl">
            <header className="page-header">
                <h2><span className="btn-icon">👨‍🍳</span> רשימת המטעמים של שבת</h2>
            </header>

            {Object.entries(groupedCooks).map(([type, cooksByType]) => (
                <div key={type} className="meal-group-card">
                    <h3 className="meal-type-title">{type}</h3>
                    <ul className="items-grid">
                        {cooksByType.map((c) => (
                            <li key={c.id} className="cook-item-card">
                                {editingId === c.id ? (
                                    <div className="edit-mode-ui">
                                        <input
                                            type="text"
                                            className="modern-input"
                                            value={editData?.name ?? ""}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                        />
                                        <input
                                            type="time"
                                            className="modern-input small"
                                            value={editData?.PreparationTime ?? ""}
                                            onChange={(e) => handleChange("PreparationTime", e.target.value)}
                                        />
                                        <div className="button-group">
                                            <button onClick={handleSaveClick}><span className="btn-icon">💾</span> שמור</button>
                                            <button onClick={handleCancelClick} className="cancel-btn">ביטול</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="display-mode-ui">
                                        <Cooking cook={c} />
                                        <div className="button-group">
                                              <button className="edit-btn" onClick={() => handleEditClick(c)}>
                                                <span className="btn-icon">✏️</span> עריכה
                                            </button>
                                            <button className="delete-btn" onClick={() => deleteCook(c)}>
                                                <span className="btn-icon">🗑️</span> מחק
                                            </button>
                                          
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    
                    <div className="add-cook-section">
                        {isAddCook ? (
                            <form className="add-form-glass" onSubmit={(e) => addCook(e, type)}>
                                <input type="text" name="cookName" className="modern-input" placeholder="שם התבשיל" required />
                                <input type="time" name="PreparationTime" className="modern-input" />
                                <div className="button-group">
                                    <button type="submit" className="save-btn"><span className="btn-icon">➕</span> הוספה</button>
                                    <button type="button" onClick={() => setIsAddCook(false)}>ביטול</button>
                                </div>
                            </form>
                        ) : (
                            <button className="add-trigger-btn" onClick={() => setIsAddCook(true)}>
                                <span className="btn-icon">✨</span> הוסף תבשיל ל{type}
                            </button>
                        )}
                    </div>
                </div>
            ))}

            <footer className="page-footer">
                <Link to="/cook-list" className="styled-link">
                    <span className="btn-icon">🍳</span> חזרה לרשימת הבישולים
                </Link>
            </footer>
        </div>
    );
}
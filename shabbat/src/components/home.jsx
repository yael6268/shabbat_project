import React, { useState, useCallback } from 'react';
import { useShabbat } from '../context/ShabbatContext';
import { Link } from 'react-router-dom';
import { getBasicCooking, getFirstMeal, getSecondMeal, getThirdMeal, getDinnerWithGuests } from '../data/cook';
import { getAllShoping } from '../data/shoping';
import { getAllTasks } from '../data/task'; 

export const Home = () => {
    const { shabbatDetails, setShabbatDetails } = useShabbat() || {};
    const [remaining, setRemaining] = useState([]);
    const [visibleShoping, setVisibleShoping] = useState([]);
    const [visibleTasks, setVisibleTasks] = useState([]); 
    const [remainingTime, setRemainingTime] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const parseTime = (t) => {
        if (!t || typeof t !== 'string') return 0;
        const parts = t.split(':').map(Number);
        return parts.length === 2 ? parts[0] * 60 + parts[1] : (Number(t) || 0);
    };

    const toggleMeal = (num) => {
        const key = String(num);
        const currentMeals = Array.isArray(shabbatDetails.meals) ? [...shabbatDetails.meals] : [];
        const index = currentMeals.indexOf(key);
        if (index === -1) currentMeals.push(key);
        else currentMeals.splice(index, 1);
        setShabbatDetails({ ...shabbatDetails, meals: currentMeals });
    };

    const handleCalculate = useCallback(() => {
        if (!shabbatDetails) return;

        const meals = Array.isArray(shabbatDetails.meals) ? shabbatDetails.meals : [];

        // --- 1. בישולים ---
        const allCooks = [...getBasicCooking(), ...getFirstMeal(), ...getSecondMeal(), ...getThirdMeal(), ...getDinnerWithGuests()];
        const mapMealToCook = (m) => (m === '1' ? 'FirstMeal' : m === '2' ? 'SecondMeal' : m === '3' ? 'ThirdMeal' : null);
        const selectedCookTypes = meals.map(mapMealToCook).filter(Boolean);
        const cookTypesToShow = Array.from(new Set(['BasicCooking', ...selectedCookTypes, ...(shabbatDetails.place === 'מארחים' ? ['DinnerWithGuests'] : [])]));
        const preparedIds = JSON.parse(localStorage.getItem('preparedCooks') || '[]');
        const filteredCooks = allCooks.filter(m => cookTypesToShow.includes(m.type) && !preparedIds.includes(m.id));
        setRemaining(filteredCooks);
        setRemainingTime(filteredCooks.reduce((acc, item) => acc + parseTime(item.PreparationTime), 0));

        // --- 2. קניות (מעודכן לפי הלוגיקה של EditShoping) ---
        const allShoping = getAllShoping ? getAllShoping() : [];
        
        // יצירת רשימת הטיפוסים שצריך להציג (בדיוק כמו deriveTypes)
        const typesToShow = ['basic'];
        if (shabbatDetails.place === 'נוסעים') typesToShow.push('stay');
        if (shabbatDetails.place === 'מארחים') typesToShow.push('guest');
        
        meals.forEach(m => {
            if (m === '1') typesToShow.push('first');
            if (m === '2') typesToShow.push('second');
            if (m === '3') typesToShow.push('third');
        });

        const filteredShoping = allShoping.filter(s => typesToShow.includes(s.type));
        setVisibleShoping(filteredShoping);

        // --- 3. משימות (גם כאן הוספתי סינון לפי סעודות אם תרצי) ---
        const allTasks = getAllTasks ? getAllTasks() : [];
        const filteredTasks = allTasks.filter(task => {
            const p = shabbatDetails.place;
            let matchesPlace = false;
            if (p === "בבית") matchesPlace = (task.place === "basic" || task.place === "atHome");
            else if (p === "נוסעים") matchesPlace = (task.place === "basic" || task.place === "traveling");
            else if (p === "מארחים") matchesPlace = (task.place === "basic" || task.place === "atHome" || task.place === "hospitality");
            
            // סינון משימות לפי סעודות (מבוסס על שדה mealType במשימה)
            const matchesMeal = !task.mealType || meals.includes(String(task.mealType));
            return matchesPlace && matchesMeal;
        });
        setVisibleTasks(filteredTasks.filter(t => t.status !== "done"));

        setIsSubmitted(true);
    }, [shabbatDetails]);

    if (!shabbatDetails) return <div className="home-container">טוען...</div>;

    return (
        <div className="home-container" dir="rtl">
            <header className="home-hero">
                <h1>🕯️🕯️{shabbatDetails.time ? `כניסת שבת: ${shabbatDetails.time}` : "ניהול שבת קודש"}</h1>
            </header>

            <div className="home-section-card settings-panel">
                <h3>⚙️ הגדרות שבת</h3>
                <div className="settings-row">
                    <div className="input-box">
                        <label>זמן כניסה:</label>
                        <input type="time" className="modern-input" value={shabbatDetails.time || ""} onChange={(e) => setShabbatDetails({...shabbatDetails, time: e.target.value})} />
                    </div>
                    <div className="input-box">
                        <label>היכן נהיה?</label>
                        <select className="modern-select" value={shabbatDetails.place || "בבית"} onChange={(e) => setShabbatDetails({...shabbatDetails, place: e.target.value})}>
                            <option value="בבית">בבית</option>
                            <option value="נוסעים">נוסעים</option>
                            <option value="מארחים">מארחים</option>
                        </select>
                    </div>
                </div>

                <div className="meals-picker">
                    <label className="picker-label">בחירת סעודות:</label>
                    <div className="checkbox-group-modern">
                        {[1, 2, 3].map(num => (
                            <label key={num} className={`meal-chip ${shabbatDetails.meals?.includes(String(num)) ? 'active' : ''}`}>
                                <input 
                                    type="checkbox" 
                                    checked={shabbatDetails.meals?.includes(String(num))} 
                                    onChange={() => toggleMeal(num)} 
                                />
                                <span>סעודה {num === 1 ? "א'" : num === 2 ? "ב'" : "ג'"}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button className="add-trigger-btn" onClick={handleCalculate}>
                        קבל תוכנית שבת
                    </button>
                </div>
            </div>

            {isSubmitted && (
                <div className="dashboard-grid">
                    <section className="home-section-card">
                        <h2>🍲 בישולים ({remaining.length})</h2>
                        <ul className="mini-list full-list">
                            {remaining.length > 0 ? remaining.map(r => (
                                <li key={r.id} className="home-item-fade"><span>{r.name}</span></li>
                            )) : <p className="all-done-text">הכל מוכן! ✨</p>}
                        </ul>
                        <Link to="/edit-cook" className="styled-link">✏️ לניהול המלא</Link>
                    </section>

                    <section className="home-section-card">
                        <h2>🛒 קניות ({visibleShoping.length})</h2>
                        <ul className="mini-list full-list">
                            {visibleShoping.length > 0 ? visibleShoping.map(s => (
                                <li key={s.id} className="home-item-fade">{s.name}</li>
                            )) : <p className="all-done-text">אין קניות נדרשות</p>}
                        </ul>
                        <Link to="/edit-shoping" className="styled-link">🛍️ לניהול קניות</Link>
                    </section>

                    <section className="home-section-card">
                        <h2>📋 משימות ({visibleTasks.length})</h2>
                        <ul className="mini-list full-list">
                            {visibleTasks.length > 0 ? visibleTasks.map(t => (
                                <li key={t.id} className="home-item-fade">{t.title}</li>
                            )) : <p className="all-done-text">הכל בוצע! ✨</p>}
                        </ul>
                        <Link to="/task-list" className="styled-link">✏️ לניהול משימות</Link>
                    </section>
                </div>
            )}
        </div>
    );
};
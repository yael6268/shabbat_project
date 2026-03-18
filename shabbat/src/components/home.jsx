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
            <section className="lux-hero">
                <h1 className="lux-hero-title">WELCOME TO SHABBAT</h1>
            </section>

            <div className="lux-cards-row">
                <div className="lux-card lux-shabbat-card">
                    <div className="lux-card-header">Shabbat Time</div>
                    <div className="lux-card-content">
                        <div className="lux-time-row">
                            <input
                                type="time"
                                className="lux-time-input"
                                value={shabbatDetails.time || ""}
                                onChange={e => setShabbatDetails({ ...shabbatDetails, time: e.target.value })}
                            />
                        </div>
                        <div className="lux-radio-row">
                            <label className="lux-radio">
                                <input
                                    type="radio"
                                    name="place"
                                    value="בבית"
                                    checked={shabbatDetails.place === "בבית"}
                                    onChange={e => setShabbatDetails({ ...shabbatDetails, place: e.target.value })}
                                />
                                At Home
                            </label>
                            <label className="lux-radio">
                                <input
                                    type="radio"
                                    name="place"
                                    value="נוסעים"
                                    checked={shabbatDetails.place === "נוסעים"}
                                    onChange={e => setShabbatDetails({ ...shabbatDetails, place: e.target.value })}
                                />
                                Traveling
                            </label>
                            <label className="lux-radio">
                                <input
                                    type="radio"
                                    name="place"
                                    value="מארחים"
                                    checked={shabbatDetails.place === "מארחים"}
                                    onChange={e => setShabbatDetails({ ...shabbatDetails, place: e.target.value })}
                                />
                                Guests
                            </label>
                        </div>
                        <div className="lux-checkbox-row">
                            <label className="lux-checkbox">
                                <input
                                    type="checkbox"
                                    checked={shabbatDetails.meals?.includes("1")}
                                    onChange={() => toggleMeal(1)}
                                />
                                First Meal
                            </label>
                            <label className="lux-checkbox">
                                <input
                                    type="checkbox"
                                    checked={shabbatDetails.meals?.includes("2")}
                                    onChange={() => toggleMeal(2)}
                                />
                                Second Meal
                            </label>
                            <label className="lux-checkbox">
                                <input
                                    type="checkbox"
                                    checked={shabbatDetails.meals?.includes("3")}
                                    onChange={() => toggleMeal(3)}
                                />
                                Third Meal
                            </label>
                        </div>
                        <button className="lux-submit-btn" onClick={handleCalculate}>
                            Submit
                        </button>
                    </div>
                </div>

            {isSubmitted && (
                <div className="lux-card lux-prep-card">
                    <div className="lux-card-header lux-prep-header">The remaining preparations</div>
                    <div className="lux-prep-grid">
                        <div className="lux-prep-col">
                            <div className="lux-prep-col-header">Tasks</div>
                            <ul className="lux-prep-list">
                                {visibleTasks.length > 0 ? visibleTasks.map(t => (
                                    <li key={t.id} className="lux-prep-item">{t.title}</li>
                                )) : <li className="lux-prep-item lux-done">All done!</li>}
                            </ul>
                        </div>
                        <div className="lux-prep-col">
                            <div className="lux-prep-col-header">Cooks</div>
                            <ul className="lux-prep-list">
                                {remaining.length > 0 ? remaining.map(r => (
                                    <li key={r.id} className="lux-prep-item">{r.name}</li>
                                )) : <li className="lux-prep-item lux-done">All ready!</li>}
                            </ul>
                        </div>
                        <div className="lux-prep-col">
                            <div className="lux-prep-col-header">Shopping</div>
                            <ul className="lux-prep-list">
                                {visibleShoping.length > 0 ? visibleShoping.map(s => (
                                    <li key={s.id} className="lux-prep-item">{s.name}</li>
                                )) : <li className="lux-prep-item lux-done">No shopping needed</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>

    );
};
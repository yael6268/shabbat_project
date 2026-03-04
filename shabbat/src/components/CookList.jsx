import { useState, useEffect } from "react";
import { getBasicCooking, getFirstMeal, getSecondMeal, getThirdMeal, getDinnerWithGuests } from "../data/cook"
import { Cooking } from "./cooking";
import { Link } from 'react-router-dom';
import { useShabbat } from '../context/ShabbatContext';

export const CookList = () => {
    const { shabbatDetails } = useShabbat();

    const allMeals = [
        ...getBasicCooking(),
        ...getFirstMeal(),
        ...getSecondMeal(),
        ...getThirdMeal(),
        ...getDinnerWithGuests()
    ];

const [cookies, setCookies] = useState([]);
    const [remainingTime, setRemainingTime] = useState(0);
    const parseTime = (t) => {
      const parts = t.split(':').map(Number);
      return parts.length === 2 ? parts[0]*60 + parts[1] : parts[0];
    };
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
        //   case '4': return 'DinnerWithGuests';
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

    

    useEffect(() => {
      const types = deriveTypes();
      // if no types selected, show nothing
      const filtered = Array.isArray(types) && types.length > 0 ? allMeals.filter(m => types.includes(m.type)) : [];
      // read prepared ids from storage so UI is shared across pages
      const preparedIds = JSON.parse(localStorage.getItem('preparedCooks') || '[]');
      const withPrepared = filtered.map(m => ({ ...m, isPrepared: preparedIds.includes(m.id) }));
      setCookies(withPrepared);
      // update remainingTime
      const mins = withPrepared.filter(x => !x.isPrepared).reduce((acc, item) => acc + parseTime(item.PreparationTime), 0);
      setRemainingTime(mins);
      // re-run when appliedAt or selection changes
    }, [shabbatDetails?.appliedAt, shabbatDetails?.meals, shabbatDetails?.place, shabbatDetails?.hospitality]);

    const formatTime = (mins) => {
      const h = Math.floor(mins/60);
      const m = mins % 60;
      return h > 0 ? `${h}:${m.toString().padStart(2,'0')}` : `${m} דקות`;
    };
    return (<>
        <h1>המטעמים של שבת</h1>
        <h2>⏱️ זמן נותר: {formatTime(remainingTime)}</h2>
        <ul className="cook-list centered-list">
            {cookies.map((c, i) => (
                <li key={c.id}
                    className={`cook-item ${c.isPrepared ? 'prepared' : ''}`}>
                    <Cooking cook={c} />
                    <input type="checkbox"
                      checked={c.isPrepared}
                      onChange={() => {
                        const newCookies = [...cookies];
                        newCookies[i] = { ...c, isPrepared: !c.isPrepared };
                        setCookies(newCookies);
                        // persist prepared ids so Home and other pages see the change
                        const prepared = newCookies.filter(x => x.isPrepared).map(x => x.id);
                        localStorage.setItem('preparedCooks', JSON.stringify(prepared));
                        // recalc remaining time
                        const mins = newCookies.filter(x => !x.isPrepared).reduce((acc,item)=>(acc+parseTime(item.PreparationTime)),0);
                        setRemainingTime(mins);
                      }} />
                </li>
            ))}
        </ul>
        <ul>

            <Link to="/edit-cook">לחזרה לעריכת מוצרים</Link>
        </ul>
    </>)
}
export default CookList;

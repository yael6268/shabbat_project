import { useState, useEffect } from "react";
import { getBasicCooking, getFirstMeal, getSecondMeal, getThirdMeal, getDinnerWithGuests } from "../data/cook"
import { Cooking } from "./Cooking";
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
    const deriveTypes = () => {
        console.log("Deriving types based on shabbatDetails:", shabbatDetails);
        
      if (!shabbatDetails) return null;
      const meals = Array.isArray(shabbatDetails.meals)
        ? shabbatDetails.meals
        : (shabbatDetails.meals ? [shabbatDetails.meals] : []);
      if (meals.length === 0) {
        // no selection -> show all available types
        // return Array.from(new Set(cookies.map(c => c.type)));
        return null;
      }
      const mapMeal = (m) => {
        switch (m) {
          case '1': return 'FirstMeal';
          case '2': return 'SecondMeal';
          case '3': return 'ThirdMeal';
          default: return null;
        }
      };
      const selectedTypes = meals.map(mapMeal).filter(Boolean);
      // always include BasicCooking when any meal is selected
      return Array.from(new Set(['BasicCooking', ...selectedTypes]));
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
        // initialize isPrepared flag if missing
        const withPrepared = filtered.map(m => ({ ...m, isPrepared: !!m.isPrepared }));
        setCookies(withPrepared);
        // re-run when appliedAt or selection changes
    }, [shabbatDetails?.appliedAt, shabbatDetails?.meals, shabbatDetails?.place, shabbatDetails?.hospitality]);

    return (<>
        <h1>המטעמים של שבת</h1>
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

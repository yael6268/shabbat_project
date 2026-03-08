import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import { getAllShoping } from "../data/shoping";
import { Shoping2} from "./shoping2";
import { useShabbat } from '../context/ShabbatContext';

import { getAllShoping, getShopingTypesFromDetails } from "../data/shoping";



export const ShopingList = ({ selectType }) => {
  const { shabbatDetails } = useShabbat();
  const [shopings, setShopings] = useState([]);
  const [visibleShopings, setVisibleShopings] = useState([]);

  useEffect(() => {
    // initialize master list with unchecked flag
    const all = getAllShoping().map(s => ({ ...s, checked: !!s.checked }));
    setShopings(all);
  }, []);
 console.log("Deriving types based on shabbatDetails:", shabbatDetails);

  // const deriveTypes = () => {
  //   if (selectType) return [selectType];
  //   if (!shabbatDetails) return ['basic'];

  //   const meals = Array.isArray(shabbatDetails.meals)
  //     ? shabbatDetails.meals
  //     : (shabbatDetails.meals ? [shabbatDetails.meals] : []);

  //   const types = [];
  //   // hospitality > guest
  //   // if (shabbatDetails.hospitality === 'ארוח') types.push('guest');
  //   // place > stay
  //   // if (shabbatDetails.place === 'נוסעים') types.push('stay');
  //   // if (shabbatDetails.place === 'בבית') types.push('basic');

  //   // map meals numbers to types
  //   const mapMeal = (m) => {
  //     switch (m) {
  //       case '1': return 'first';
  //       case '2': return 'second';
  //       case '3': return 'third';
  //       default: return null;
  //     }
  //   };

  //   const mealTypes = meals.map(mapMeal).filter(Boolean);
  //   if (mealTypes.length > 0) {
  //     // always include basic when any meal selected
  //     types.push('basic', ...mealTypes);
  //   }

    // if nothing was selected, default to basic
  //   return types.length > 0 ? Array.from(new Set(types)) : ['basic'];
  // };

 useEffect(() => {
  const typesToShow = getShopingTypesFromDetails(shabbatDetails);

  const filtered =
    shopings.filter(s => typesToShow.includes(s.type));

  setVisibleShopings(filtered);

}, [shabbatDetails?.meals, shabbatDetails?.place, shopings]);

  const deriveTypes = () => {
    if (selectType) return [selectType];
    if (!shabbatDetails) return ['basic'];

    const meals = Array.isArray(shabbatDetails.meals)
      ? shabbatDetails.meals
      : (shabbatDetails.meals ? [shabbatDetails.meals] : []);

    const types = [];
    // hospitality > guest
    if (shabbatDetails.hospitality === 'ארוח') types.push('guest');
    // place > stay
    if (shabbatDetails.place === 'נוסעים') types.push('stay');

    // map meals numbers to types
    const mapMeal = (m) => {
      switch (m) {
        case '1': return 'first';
        case '2': return 'second';
        case '3': return 'third';
        default: return null;
      }
    };

    const mealTypes = meals.map(mapMeal).filter(Boolean);
    if (mealTypes.length > 0) {
      // always include basic when any meal selected
      types.push('basic', ...mealTypes);
    }

    // if nothing was selected, default to basic
    return types.length > 0 ? Array.from(new Set(types)) : ['basic'];
  };

  useEffect(() => {
    // Update visible list whenever context or master list changes
    const typesToShow = deriveTypes();
    const filtered = Array.isArray(typesToShow) && typesToShow.length > 0
      ? shopings.filter(s => typesToShow.includes(s.type))
      : [];

    setVisibleShopings(filtered);
  }, [shabbatDetails?.meals, shabbatDetails?.place, shabbatDetails?.hospitality, shopings]);


  const toggleChecked = (id) => {
    setShopings(prev => prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
    setVisibleShopings(prev => prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  return (
    <div className="centered-list">
      <h2>רשימת קניות</h2>
      {visibleShopings.length === 0 ? (
        <p>לא נבחרו סעודות בעמוד הבית — אין פריטים להצגה</p>
      ) : (
        <ul className="task-list">
          {visibleShopings.map(shoping => (
            <Shoping2
              key={shoping.id}
              shoping={shoping}
              onToggle={() => toggleChecked(shoping.id)}
            />
          ))}
        </ul>
      )}
      <div style={{ marginTop: 8 }}>
        <Link to="/edit-shoping" style={{ textDecoration: 'none', color: 'var(--royal)', fontWeight: 600 }}>עריכת קניות</Link>

      </div>
    </div>
  );
};

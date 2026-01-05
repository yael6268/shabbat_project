import { useState } from "react";
import { Link } from 'react-router-dom';
import { getAllShoping } from "../data/shoping";
import { Shoping2} from "./shoping2";

export const ShopingList = ({ selectType }) => {
  const [shopings, setShopings] = useState(getAllShoping());

 

  const getTypeShoping = (type) => {
    switch (type) {
      case "basic":
        return shopings.filter(s => s.type === "basic");
      case "first":
        return shopings.filter(s => s.type === "basic" || s.type === "first");
      case "second":
        return shopings.filter(s => s.type === "basic" || s.type === "second" );
          case "third":
        return shopings.filter(s => s.type === "basic" || s.type === "third" );
          case "guest":
        return shopings.filter(s => s.type === "basic" || s.type === "second"||s.type === "third" ||s.type === "first" ||s.type === "guest"  );
         case "stay":
        return shopings.filter(s => s.type === "basic" || s.type === "stay"  );
      default:
        return shopings;
    }
  };

  const shopingToShow = selectType ? getTypeShoping(selectType) : shopings;
  return (
    <div className="centered-list">
      <h2>רשימת קניות</h2>
      <ul className="task-list">
        {shopingToShow.map(shoping => (
          <Shoping2
            key={shoping.id}
            shoping={shoping}
            onToggle={() => toggleDone(shoping.id)}
          />
        ))}
      </ul>
            <div style={{ marginTop: 8 }}>
        <Link to="/edit-shoping" style={{ textDecoration: 'none', color: 'var(--royal)', fontWeight: 600 }}>עריכת קניות</Link>

      </div>
    </div>
  );
};

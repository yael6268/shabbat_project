import { use, useState } from "react";
import { getBasicCooking } from "../data/cook"
import { Cooking } from "./Cooking";
// import { Home } from "./Home";
// import { home } from "/home"2
export const CookList = () => {
    const [cookies, setCookies] = useState(getBasicCooking());
    return (<>
        <h1>המטעמים של שבת</h1>
        <ul className="cook-list centered-list">

            {cookies.map((c, i) => (
                <li key={c.id}
                   className={`cook-item ${c.isPrepared ? 'prepared' : ''}`}>
                    <Cooking cook={c} />
                    {console.log(c.isPrepared)}
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
    </>)
}
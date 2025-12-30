import { getBasicCooking } from "../data/cook"
import { Cooking } from "./Cooking";
// import { Home } from "./Home";
// import { home } from "/home"2
export const CookList = () => {
    const cookies= getBasicCooking();
    
    
    return (<>
    <h1>המטעמים של שבת</h1>
    <ul>

        {cookies.map(c => <Cooking key={c.id} cook={c}/> )}
        
    </ul>
    </>)
}
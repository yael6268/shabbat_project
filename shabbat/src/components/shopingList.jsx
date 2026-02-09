import { use, useState } from "react";
import { getBasicShoping,getShopingForFirstMeal,getShopingForStayWithFamily,getShopingForGuests,getShopingForSecondMeal,getShopingForThirdMeal } from "../data/shoping"
import { Shoping } from "./shoping";
import { useEffect } from "react";
export const ShopingList = ({showOnly}) => {
const [shoping, setShoping] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
const [basicShoping, setBasicShoping] = useState([]);
 const loadshop = async () => {
        setLoading(true);
        try {
            const basicShoping = await getBasicShoping();
            setShoping(basicShoping);
        } catch (error) {
            console.log('error in loading', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadshop();
    }, []);

    return (<>
        <h1>  רשימת הקניות לשבת</h1>
        {/* <ul> */}

            {/* {shoping.map(s => (

                <li key={s.id}
                    style={{ color: '#155h', backgroundColor: '#155vbg' }}>
                    <Shoping shoping={s} showOnly={shoping} />
              
                </li>    ))} */}
                 <ul>  {shoping.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>

        



        {/* </ul> */}
    </>)
}
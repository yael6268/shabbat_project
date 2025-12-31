import { use, useState, useEffect } from "react";
import { getBasicShoping, getShopingForFirstMeal, getShopingForStayWithFamily, getShopingForGuests, getShopingForSecondMeal, getShopingForThirdMeal } from "../data/shoping"
import { Shoping } from "./shoping";
export const ShopingList = ({ showOnly }) => {
    // const [shoping, setShoping] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [basicShoping, setBasicShoping] = useState([]);
    const [ShopingForFirstMeal, setShopingForFirstMeal] = useState([]);
    const [ShopingForStayWithFamily, setShopingForStayWithFamily] = useState([]);
    const [ShopingForGuests, setShopingForGuests] = useState([]);
    const [ShopingForSecondMeal, setShopingForSecondMeal] = useState([]);
    const [ShopingForThirdMeal, setShopingForThirdMeal] = useState([]);
    const loadshop = async () => {
        setLoading(true);
        try {
            const basicShoping = await getBasicShoping();
            setBasicShoping(basicShoping);
            const ShopingForFirstMeal = await getShopingForFirstMeal();
            setShopingForFirstMeal(ShopingForFirstMeal);
            const ShopingForStayWithFamily = await getShopingForStayWithFamily();
            setShopingForStayWithFamily(ShopingForStayWithFamily);
            const ShopingForGuests = await getShopingForGuests();
            setShopingForGuests(ShopingForGuests);
            const ShopingForSecondMeal = await getShopingForSecondMeal();
            setShopingForSecondMeal(ShopingForSecondMeal);
            const ShopingForThirdMeal = await getShopingForThirdMeal();
            setShopingForThirdMeal(ShopingForThirdMeal);
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
        <h3>קניות בסיסיות</h3>
        <ul>{basicShoping.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <h3>קניות לסעודה ראשונה</h3>
        <ul>{ShopingForFirstMeal.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <h3>קניות לסעודה שניה</h3>
        <ul>{ShopingForSecondMeal.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <h3>קניות לסעודה שלישית</h3>
        <ul>{ShopingForThirdMeal.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <h3>קניות לאירוח אצל משפחה</h3>
        <ul>{ShopingForStayWithFamily.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <h3>קניות לאירוח אורחים</h3>
        <ul>{ShopingForGuests.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>




        {/* </ul> */}
    </>)
}
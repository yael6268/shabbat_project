import { use, useState, useEffect } from "react";
import { getBasicShoping, getShopingForFirstMeal, getShopingForStayWithFamily, getShopingForGuests, getShopingForSecondMeal, getShopingForThirdMeal,addNewproduct } from "../data/shoping"
import { Shoping } from "./shoping";
import { nanoid } from 'nanoid';
// import { nanoid } from '../node_modules/nanoid/nanoid.js';
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
    const addproduct = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,  
            id: nanoid(),
        }
        event.target.reset();
       
        const newproducts = await addNewproduct(newproduct);
        
        setBasicShoping(newproducts);
       
       
    }
    const addproduct1 = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,  
            id: 100,
        }
        event.target.reset();
       
        const newproducts = await addNewproduct(newproduct);
        
        setShopingForFirstMeal(newproducts);
       
       
    }
    const addproduct2 = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,  
            id: 100,
        }
        event.target.reset();
       
        const newproducts = await addNewproduct(newproduct);
        
        setShopingForSecondMeal(newproducts);
       
       
    }
    const addproduct3 = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,  
            id: 100,
        }
        event.target.reset();
       
        const newproducts = await addNewproduct(newproduct);
        
        setShopingForThirdMeal(newproducts);
       
       
    }
    const addproduct4 = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,  
            id: 100,
        }
        event.target.reset();
       
        const newproducts = await addNewproduct(newproduct);
        
        setShopingForStayWithFamily(newproducts);
       
       
    }
    const addproduct5 = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,  
            id: nanoid,
        }
        event.target.reset();
       
        const newproducts = await addNewproduct(newproduct);
        
        setShopingForGuests(newproducts);
       
    
    }

    return (<>
        <h1>  רשימת הקניות לשבת</h1>
        
        <h3>קניות בסיסיות</h3>
        <ul>{basicShoping.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <form onSubmit={addproduct}>
            <input type="text" name="name" placeholder='הכנס שם מוצר'/> <br/>
            <br />
            <button> add new product </button>
        </form>
       

        <h3>קניות לסעודה ראשונה</h3>
        <ul>{ShopingForFirstMeal.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <form onSubmit={addproduct1}>
            <input type="text" name="name" placeholder='הכנס שם מוצר'/> <br/>
            <br />
            <button> add new product </button>
        </form>


        <h3>קניות לסעודה שניה</h3>
        <ul>{ShopingForSecondMeal.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <form onSubmit={addproduct2}>
            <input type="text" name="name" placeholder='הכנס שם מוצר'/> <br/>
            <br />
            <button> add new product </button>
        

        <h3>קניות לסעודה שלישית</h3>
        <ul>{ShopingForThirdMeal.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <form onSubmit={addproduct3}>
            <input type="text" name="name" placeholder='הכנס שם מוצר'/> <br/>
            <br />
            <button> add new product </button>
        </form>


        <h3>קניות לאירוח אצל משפחה</h3>
        <ul>{ShopingForStayWithFamily.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <form onSubmit={addproduct4}>
            <input type="text" name="name" placeholder='הכנס שם מוצר'/> <br/>
            <br />
            <button> add new product </button>
        </form>


        <h3>קניות לאירוח אורחים</h3>
        <ul>{ShopingForGuests.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} />)} </ul>
        <form onSubmit={addproduct5}>
            <input type="text" name="name" placeholder='הכנס שם מוצר'/> <br/>
            <br />
            <button> add new product </button>
        </form>




    </>);
}
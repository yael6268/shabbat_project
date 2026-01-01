import { use, useState, useEffect } from "react";
import { getBasicShoping, getShopingForFirstMeal, getShopingForStayWithFamily, getShopingForGuests, getShopingForSecondMeal, getShopingForThirdMeal, addNewproduct,addNewproduct1,addNewproduct2,addNewproduct3,addNewproduct4,addNewproduct5 } from "../data/shoping"
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

        const newproducts = await addNewproduct1(newproduct);

        setShopingForFirstMeal(newproducts);


    }
    const addproduct2 = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,
            id: 100,
        }
        event.target.reset();

        const newproducts = await addNewproduct2(newproduct);

        setShopingForSecondMeal(newproducts);


    }
    const addproduct3 = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,
            id: 100,
        }
        event.target.reset();

        const newproducts = await addNewproduct3(newproduct);

        setShopingForThirdMeal(newproducts);


    }
    const addproduct4 = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,
            id: 100,
        }
        event.target.reset();

        const newproducts = await addNewproduct4(newproduct);

        setShopingForStayWithFamily(newproducts);


    }
    const addproduct5 = async (event) => {
        event.preventDefault();
        const newproduct = {
            name: event.target.name.value,
            id: nanoid,
        }
        event.target.reset();

        const newproducts = await addNewproduct5(newproduct);

        setShopingForGuests(newproducts);


    }

    // local delete handlers - update component state when child calls onDelete
    const deleteProduct = (id) => setBasicShoping(prev => prev.filter(p => p.id !== id));
    const deleteProduct1 = (id) => setShopingForFirstMeal(prev => prev.filter(p => p.id !== id));
    const deleteProduct2 = (id) => setShopingForSecondMeal(prev => prev.filter(p => p.id !== id));
    const deleteProduct3 = (id) => setShopingForThirdMeal(prev => prev.filter(p => p.id !== id));
    const deleteProduct4 = (id) => setShopingForStayWithFamily(prev => prev.filter(p => p.id !== id));
    const deleteProduct5 = (id) => setShopingForGuests(prev => prev.filter(p => p.id !== id));

    return (<>
        <h1>  רשימת הקניות לשבת</h1>

        <h3>קניות בסיסיות</h3>
        <ul className="shop-list centered-list">{basicShoping.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} onDelete={deleteProduct} />)} </ul>
        <button className="btn secondary" onClick={() => setBasicShoping([])}>Delete</button>
        <form onSubmit={addproduct} className="card">
            
            <input type="text" name="name" placeholder='הכנס שם מוצר' /> <br />
            <br />
            <button className="btn"> add new product </button>
        </form>


        <h3>קניות לסעודה ראשונה</h3>
        <ul className="shop-list centered-list">{ShopingForFirstMeal.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} onDelete={deleteProduct1} />)} </ul>
        <button className="btn secondary" onClick={() => setShopingForFirstMeal([])}>Delete</button>
        <form onSubmit={addproduct1} className="card">
            <input type="text" name="name" placeholder='הכנס שם מוצר' /> <br />
            <br />
            <button className="btn"> add new product </button>
        </form>


        <h3>קניות לסעודה שניה</h3>
        <ul className="shop-list centered-list">{ShopingForSecondMeal.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} onDelete={deleteProduct2} />)} </ul>
        <button className="btn secondary" onClick={() => setShopingForSecondMeal([])}>Delete</button>
        <form onSubmit={addproduct2} className="card">
            <input type="text" name="name" placeholder='הכנס שם מוצר' /> <br />
            <br />
            <button className="btn"> add new product </button>
            </form>

            <h3>קניות לסעודה שלישית</h3>
            <ul className="shop-list centered-list">{ShopingForThirdMeal.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} onDelete={deleteProduct3} />)} </ul>
        <button type="button" className="btn secondary" onClick={() => setShopingForThirdMeal([])}>Delete</button>
            <form onSubmit={addproduct3} className="card">
                <input type="text" name="name" placeholder='הכנס שם מוצר' /> <br />
                <br />
                <button className="btn"> add new product </button>
            </form>


            <h3>קניות לאירוח אצל משפחה</h3>
            <ul className="shop-list centered-list">{ShopingForStayWithFamily.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} onDelete={deleteProduct4} />)} </ul>
        <button type="button" className="btn secondary" onClick={() => setShopingForStayWithFamily([])}>Delete</button>
            <form onSubmit={addproduct4} className="card">
                <input type="text" name="name" placeholder='הכנס שם מוצר' /> <br />
                            <br />
                <button className="btn"> add new product </button>
            </form>


            <h3>קניות לאירוח אורחים</h3>
            <ul className="shop-list centered-list">{ShopingForGuests.map(s => <Shoping key={s.id} shoping={s} showOnly={showOnly} onDelete={deleteProduct5} />)} </ul>
        <button type="button" className="btn secondary" onClick={() => setShopingForGuests([])}>Delete</button>
            <form onSubmit={addproduct5} className="card">
                <input type="text" name="name" placeholder='הכנס שם מוצר' /> <br />
                <br />
                <button className="btn"> add new product </button>
            </form>

        </>);
}
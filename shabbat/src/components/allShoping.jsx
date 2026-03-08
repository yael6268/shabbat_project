import { Link } from 'react-router-dom';
// import { ShopingList } from './shopingList';

export default function ShopingList({ showOnly }) {
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

        <ul className="shop-list centered-list">{basicShoping.map(s => <Shoping2 key={s.id} shoping={s} showOnly={showOnly} input type="checkbox"/>)} </ul>
        <ul className="shop-list centered-list">{ShopingForFirstMeal.map(s => <Shoping2 key={s.id} shoping={s} showOnly={showOnly} input type="checkbox"/>)} </ul>
        <ul className="shop-list centered-list">{ShopingForSecondMeal.map(s => <Shoping2 key={s.id} shoping={s} showOnly={showOnly} input type="checkbox"/>)} </ul>
        <ul className="shop-list centered-list">{ShopingForThirdMeal.map(s => <Shoping2 key={s.id} shoping={s} showOnly={showOnly} input type="checkbox"/>)} </ul>
        <ul className="shop-list centered-list">{ShopingForStayWithFamily.map(s => <Shoping2 key={s.id} shoping={s} showOnly={showOnly} input type="checkbox"/>)} </ul>
        <ul className="shop-list centered-list">{ShopingForGuests.map(s => <Shoping2 key={s.id} shoping={s} showOnly={showOnly} input type="checkbox"/>)} </ul>
        <ul>
            <li>
                <Link to="/shoping-list">  לחזרה לעריכת מוצרים</Link>
            </li>
        </ul>
    </>);
}

export const AllShoping = () => {
	return (
		<div className="centered-list">
			<h1>כל מוצרי הקניות לשבת</h1>
			<ShopingList showOnly={true} />
			<div style={{ marginTop: 12 }}>
				<Link to="/shoping-list" style={{ textDecoration: 'none', color: 'var(--royal, #2b6f77)', fontWeight: 600 }}>לחזרה לעריכת מוצרים</Link>
			</div>
		</div>
	);
};




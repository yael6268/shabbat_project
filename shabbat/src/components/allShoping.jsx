import { Link } from 'react-router-dom';
import { ShopingList } from './shopingList';

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




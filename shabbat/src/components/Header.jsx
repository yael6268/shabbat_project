import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
    return (             
        <header className="header" dir='rtl'> 
         
            <nav className="nav">
 
                <ul className="nav-menu">
                    <h1>ניהול שבת</h1>
                    <li>
                        <Link to="/">עמוד הבית</Link>
                    </li>
                    <li>
                        <Link to="/cook-list">רשימת בישול</Link>
                    </li>
                    <li>
                        <Link to="/shopping-list">רשימת קניות</Link>
                    </li>
                    <li>
                        <Link to="/task-list">רשימת משימות</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
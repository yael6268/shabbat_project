import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
    return (
        <header className="lux-header" dir="rtl">
            <div className="lux-header-inner">
                <div className="lux-header-left">
                    {/* Logo image (replace src with actual logo path if available) */}
                    <img src="/logo.png" alt="Shabbat Logo" className="lux-logo" />
                </div>
                <nav className="lux-header-right">
                    <ul className="lux-nav-menu">
                        <li><Link to="/edit-cook">COOKING</Link></li>
                        <li><Link to="/edit-shoping">SHOPPING</Link></li>
                        <li><Link to="/task-list">TASKS</Link></li>
                        <li className="lux-hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
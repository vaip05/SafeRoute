import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo-wrapper">
                    <img src="/src/assets/safeRouteLogo.png" alt="SafeRoute Logo" className="logo-image" />
                    <span className="app-name">SafeRoute</span>
                </div>
            </div>

            <div className="header-right">


                <nav className="nav-links">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                        Home
                    </NavLink>
                    <NavLink to="/map" className={({ isActive }) => (isActive ? 'active' : '')}>
                        Map
                    </NavLink>
                    <NavLink to="/reports/main" className={({ isActive }) => (isActive ? 'active' : '')}>
                        Reports
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                        About
                    </NavLink>
                </nav>
                <Link to="/sos" className="sos-button">
                    <span className="sos-icon">📡</span> SOS
                </Link>
            </div>
        </header>
    );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/">Home</Link></li>
                    <li className="nav-item"><Link to="/products">Products</Link></li>
                    <li className="nav-item"><Link to="/cart">Cart</Link></li>
                    <li className="nav-item"><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
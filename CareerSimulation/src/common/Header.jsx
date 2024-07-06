import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <h1>MyApp</h1>
        </div>
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Home</Link></li>
          <li className="nav-item"><Link to="/login">Login</Link></li>
          <li className="nav-item"><Link to="/register">Register</Link></li>
          <li className="nav-item"><Link to="/products">Products</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

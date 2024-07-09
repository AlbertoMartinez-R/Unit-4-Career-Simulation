import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <h1>My App</h1>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          {user && user.isAdmin && (
            <li className="nav-item">
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </li>
          )}
          {user ? (
            <li className="nav-item">
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
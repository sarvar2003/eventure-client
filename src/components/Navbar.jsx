import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUserCircle, FaPlus } from 'react-icons/fa';


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('token'); // or 'access_token' or however you're storing it
    setIsLoggedIn(!!token);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        <Link className="logo-text" to="/">Eventure</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about') ? 'active' : ''}`} to="/about">About us</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact">Contact</Link>
            </li>
            <li className="nav-item mx-2">
              {isLoggedIn ? (
                <Link className={`nav-link ${isActive('/me') ? 'active' : ''}`} to="/me">
                  <FaUserCircle size={24} className="me-1" />
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary ms-3"
                  style={{ textDecoration: 'none' }}
                >
                  Login
                </Link>
              )}
            </li>
            {isLoggedIn && (
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/create-event') ? 'active' : ''}`} to="/create-event"><FaPlus className='me-1'/> Create Event</Link>
            </li>
          )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

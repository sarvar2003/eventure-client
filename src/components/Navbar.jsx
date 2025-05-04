import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('token'); // or 'access_token' or however you're storing it
    setIsLoggedIn(!!token);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="logo-text" to="/">Eventure</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
            <li className="nav-item">
              {isLoggedIn ? (
                <Link className={`nav-link ${isActive('/profile') ? 'active' : ''}`} to="/profile">
                  <FaUserCircle size={24} />
                </Link>
              ) : (
                <Link
                  style={{ textDecoration: 'none' }}
                  className="btn-primary-blue rounded p-2"
                  to="/login"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

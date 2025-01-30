import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Astrology</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/zodiac-signs">Daily Horoscope</Link>
        <Link to="/consultation">Consultation</Link>
        <Link to="/tamil-temples">Tamil Temples</Link>
        {user ? (
          <>
            <Link to="/book-appointment">Book Appointment</Link>
            <button onClick={handleLogout} className="logout-btn">LogIn</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;

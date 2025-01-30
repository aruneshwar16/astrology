import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import ZodiacSigns from './components/ZodiacSigns';
import Consultation from './components/Consultation';
import './App.css';
import DailyHoroscope from './components/DailyHoroscope';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">Astroguid</Link>
          </div>
          <div className="nav-links">
            <Link to="/">  Home  </Link>
            <Link to="/zodiac">Daily Horoscope</Link>
            <Link to="/consultation">Consultation</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/zodiac" element={<DailyHoroscope />} />
          <Route path="/consultation" element={<Consultation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

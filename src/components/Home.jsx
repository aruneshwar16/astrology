import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content-overlay">
        <h1>Welcome to AstroGuide</h1>
        <p>Discover your cosmic journey with personalized astrological insights</p>
        
        <div className="features">
          <div className="feature-card">
            <h2>Daily Horoscope</h2>
            <p>Get your daily astrological predictions</p>
            <Link to="/zodiac-signs" className="feature-link">Read More</Link>
          </div>
          
          <div className="feature-card">
            <h2>Consultation</h2>
            <p>Personal guidance from expert astrologers</p>
            <Link to="/consultation" className="feature-link">Book Now</Link>
          </div>
          
          <div className="feature-card">
            <h2>Tamil Temples</h2>
            <p> South Indian Temples for spiritual blessings</p>
            <Link to="/tamil-temples" className="feature-link">Explore</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ZodiacSigns from './components/ZodiacSigns';
import Consultation from './components/Consultation';
import TamilTemples from './components/TamilTemples';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <div className="video-background">
            <video 
              src="/videos/background.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                minWidth: '100%',
                minHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'cover',
                zIndex: '-1'
              }}
            />
            <div className="video-overlay"></div>
          </div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/zodiac-signs" element={<ZodiacSigns />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/tamil-temples" element={<TamilTemples />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

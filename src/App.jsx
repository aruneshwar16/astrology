import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ZodiacSigns from './components/ZodiacSigns';
import Consultation from './components/Consultation';
import TamilTemples from './components/TamilTemples';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookAppointment from './components/BookAppointment';
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
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'translate(-50%, -50%)', // Centers the video
                zIndex: '-1',
              }}
              
            />
            <div className="video-overlay"></div>
          </div>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/zodiac-signs" element={<ZodiacSigns />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/tamil-temples" element={<TamilTemples />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import './HoroscopeModal.css';

const HoroscopeModal = ({ horoscope, onClose }) => {
  if (!horoscope) return null;

  return (
    <div className="horoscope-modal-overlay" onClick={onClose}>
      <div className="horoscope-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{horoscope.sign}</h2>
        <div className="horoscope-details">
          <p className="description">{horoscope.description}</p>
          <div className="horoscope-grid">
            <div className="horoscope-item">
              <strong>இன்றைய நிறம்:</strong>
              <span>{horoscope.color}</span>
            </div>
            <div className="horoscope-item">
              <strong>அதிர்ஷ்ட எண்:</strong>
              <span>{horoscope.lucky_number}</span>
            </div>
            <div className="horoscope-item">
              <strong>அதிர்ஷ்ட நேரம்:</strong>
              <span>{horoscope.lucky_time}</span>
            </div>
            <div className="horoscope-item">
              <strong>மனநிலை:</strong>
              <span>{horoscope.mood}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoroscopeModal;

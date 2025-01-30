import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config.js';
import './Consultation.css';

const Consultation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    consultationType: 'video',
    astrologer: 'K P vidyanathan',
    message: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Get token and user from localStorage
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) {
        setError('Please login to book a consultation');
        navigate('/login');
        return;
      }

      // Validate required fields
      if (!formData.date || !formData.time || !formData.consultationType || !formData.astrologer) {
        setError('Please fill in all required fields');
        return;
      }

      // Create ISO date string from date and time
      const dateTime = new Date(formData.date + 'T' + formData.time);
      
      // Validate date is not in past
      if (dateTime < new Date()) {
        setError('Please select a future date and time');
        return;
      }

      const appointmentData = {
        ...formData,
        date: dateTime.toISOString(),
        userId: user.id
      };

      console.log('Sending appointment request:', {
        ...appointmentData,
        token: '[HIDDEN]'
      });

      const response = await fetch(`${API_BASE_URL}/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book consultation');
      }

      const data = await response.json();
      console.log('Appointment booked successfully:', data);
      
      setSuccess('Consultation booked successfully! We will contact you shortly.');
      setFormData({
        date: '',
        time: '',
        consultationType: 'video',
        astrologer: 'K P vidyanathan',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred while booking the consultation');
    }
  };

  return (
    <div className="consultation-container">
      <div className="consultation-box">
        <h2>Book a Consultation</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Consultation Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Consultation Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="consultationType">Consultation Type</label>
            <select
              id="consultationType"
              name="consultationType"
              value={formData.consultationType}
              onChange={handleInputChange}
              required
            >
              <option value="video">Video Call</option>
              <option value="audio">Audio Call</option>
              <option value="chat">Chat</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="astrologer">Astrologer</label>
            <select
              id="astrologer"
              name="astrologer"
              value={formData.astrologer}
              onChange={handleInputChange}
              required
            >
              <option value="K P vidyanathan">K P Vidyanathan</option>
              <option value="Shri Indrajit">Shri Indrajit</option>
              <option value="Guruji Shastri">Guruji Shastri</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
            ></textarea>
          </div>
          <button type="submit">Book Consultation</button>
        </form>
      </div>
    </div>
  );
};

export default Consultation;

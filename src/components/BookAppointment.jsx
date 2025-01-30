import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import './BookAppointment.css';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    consultationType: 'online',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If user is not logged in, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Please login to book an appointment');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }

      setMessage('Appointment booked successfully!');
      // Clear form after successful booking
      setFormData({
        date: '',
        time: '',
        consultationType: 'online',
        description: ''
      });
      
      // Redirect to appointments list or confirmation page
      setTimeout(() => navigate('/appointments'), 2000);

    } catch (error) {
      console.error('Appointment booking error:', error);
      setMessage(error.message || 'Failed to book appointment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="book-appointment-container">
      <h2>Book an Appointment</h2>
      {message && <div className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</div>}
      
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="consultationType">Consultation Type:</label>
          <select
            id="consultationType"
            name="consultationType"
            value={formData.consultationType}
            onChange={handleChange}
            required
          >
            <option value="online">Online</option>
            <option value="inPerson">In Person</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please describe your concerns or questions..."
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;

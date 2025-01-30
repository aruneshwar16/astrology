import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Consultation.css';

const Consultation = () => {
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    astrologer: '',
    consultationType: 'video',
    message: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const astrologers = [
    {
      name: 'Dr.Sehlvi',
      specialty: 'Celebrity Astrologer',
      experience: '18 years',
      image: 'https://pbs.twimg.com/profile_images/1561716723723960322/tg2m6rno_400x400.jpg',
    },
    {
      name: ' K.Harikesanallur Venkataraman ',
      specialty: 'Tranditional Astrology',
      experience: '20 years',
      image: 'https://www.harikesanallur.com/images/about.jpg',
    },
    {
      name: ' Mrs Mangkarasi',
      specialty: 'Devotional Speaker and Female Astrologyer',
      experience: '12 years',
      image: 'https://scontent.fcjb3-3.fna.fbcdn.net/v/t1.6435-9/50622402_2209185656006184_1408525883249000448_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=zOrEeOeF5NAQ7kNvgFOGIWH&_nc_zt=23&_nc_ht=scontent.fcjb3-3.fna&_nc_gid=A5zKz-MHiUcFz4UpbzIQS4Y&oh=00_AYBK4GneHxBYUtLDCumT4NbFoRrsnOeyPNno1rnxK6KSdA&oe=67BB25BF',
    },
    {
      name: 'K P vidyanathan',
      specialty: 'Modern Astrology',
      experience: '20 years',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQZ1J6M1-Rt6d4dAnncl-98frp_xBQCI1DFw&s'
    },
    {
      name: 'Mrs Saravana Devi',
      specialty: 'Vastu Astrology',
      experience: '15 years',
      image: '/images/sravanadevi.jpg'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear any previous error/success messages
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to book an appointment');
        navigate('/login');
        return;
      }

      // Validate required fields
      if (!appointmentData.name || !appointmentData.email || !appointmentData.phone || 
          !appointmentData.date || !appointmentData.time || !appointmentData.astrologer) {
        setError('Please fill in all required fields');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(appointmentData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Validate phone number (10 digits)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(appointmentData.phone)) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }

      // Validate date (must be future date)
      const selectedDate = new Date(appointmentData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setError('Please select a future date');
        return;
      }

      // Make API call to book appointment
      const response = await axios.post(
        'http://localhost:5000/api/appointments',
        appointmentData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Show success message
      setSuccess('Appointment booked successfully!');
      
      // Clear form
      setAppointmentData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        astrologer: '',
        consultationType: 'video',
        message: ''
      });

    } catch (error) {
      console.error('Appointment booking error:', error);
      setError(error.response?.data?.message || 'Error booking appointment. Please try again.');
    }
  };

  return (
    <div className="consultation-container">
      <div className="consultation-content">
        <div className="astrologers-section">
          <h1>Our Expert Astrologers</h1>
          <h3>BOOK YOUR ASTROLOGICAL CONSULTATION NOW..!</h3>
          <div className="astrologers-grid">
            {astrologers.map((astrologer) => (
              <div key={astrologer.name} className="astrologer-card">
                <div className="astrologer-avatar">
                  <img src={astrologer.image} alt={astrologer.name} />
                </div>
                <h3>{astrologer.name}</h3>
                <p className="specialty">{astrologer.specialty}</p>
                <p className="experience">{astrologer.experience} experience</p>
              </div>
            ))}
          </div>
        </div>

        <div className="appointment-section">
          <h2>Book Your Appointment</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name*</label>
              <input
                type="text"
                name="name"
                value={appointmentData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={appointmentData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Phone*</label>
              <input
                type="tel"
                name="phone"
                value={appointmentData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Select Astrologer*</label>
              <select
                name="astrologer"
                value={appointmentData.astrologer}
                onChange={handleChange}
                required
              >
                <option value="">Choose an astrologer</option>
                {astrologers.map(astrologer => (
                  <option key={astrologer.name} value={astrologer.name}>
                    {astrologer.name} - {astrologer.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date*</label>
              <input
                type="date"
                name="date"
                value={appointmentData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label>Time*</label>
              <input
                type="time"
                name="time"
                value={appointmentData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Consultation Type</label>
              <select
                name="consultationType"
                value={appointmentData.consultationType}
                onChange={handleChange}
              >
                <option value="video">Video Call</option>
                <option value="audio">Audio Call</option>
                <option value="chat">Chat</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea
                name="message"
                value={appointmentData.message}
                onChange={handleChange}
                placeholder="Any specific concerns or questions?"
                rows="4"
              />
            </div>

            <button type="submit" className="submit-btn">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consultation;

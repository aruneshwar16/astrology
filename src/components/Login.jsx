import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    zodiacSign: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const baseURL = 'http://localhost:5000/api/auth';
      if (isLogin) {
        // Login request
        const res = await axios.post(`${baseURL}/login`, {
          username: formData.username,
          password: formData.password
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      } else {
        // Register request
        if (!formData.email || !formData.zodiacSign) {
          setError('Email and Zodiac Sign are required for registration');
          return;
        }
        await axios.post(`${baseURL}/signup`, formData);
        setError('Registration successful! Please login.');
        setIsLogin(true);
        // Clear form after successful registration
        setFormData({ username: '', email: '', password: '', zodiacSign: '' });
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Zodiac Sign</label>
              <select 
                name="zodiacSign" 
                value={formData.zodiacSign} 
                onChange={handleChange} 
                required
              >
                <option value="">Select your zodiac sign</option>
                {zodiacSigns.map(sign => <option key={sign} value={sign}>{sign}</option>)}
              </select>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="toggle-form">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setFormData({ username: '', email: '', password: '', zodiacSign: '' });
          }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

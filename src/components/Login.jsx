import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config.js';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    zodiacSign: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setMessage('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setMessage('Username is required');
      return false;
    }
    if (formData.username.trim().length < 3) {
      setMessage('Username must be at least 3 characters long');
      return false;
    }
    if (!isLogin && !formData.email.trim()) {
      setMessage('Email is required');
      return false;
    }
    if (!isLogin && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setMessage('Please enter a valid email address');
      return false;
    }
    if (!formData.password.trim()) {
      setMessage('Password is required');
      return false;
    }
    if (!isLogin && formData.password.trim().length < 6) {
      setMessage('Password must be at least 6 characters long');
      return false;
    }
    if (!isLogin && !formData.zodiacSign) {
      setMessage('Please select your zodiac sign');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage('');
    
    try {
      const endpoint = isLogin ? 'login' : 'register';
      const requestData = isLogin 
        ? { username: formData.username, password: formData.password }
        : formData;

      const url = `${API_BASE_URL}/auth/${endpoint}`;
      console.log('Sending request to:', url);
      console.log('Request data:', { ...requestData, password: '****' });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      // First check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Use the login function from AuthContext
      login(data.user, data.token);

      // Set success message
      setMessage(isLogin ? 'Login successful!' : 'Registration successful!');

      // Wait a moment to show the success message before redirecting
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage(error.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      zodiacSign: ''
    });
    setMessage('');
  };

  return (
    <div className="login-container">
      <div className="video-background">
        <div className="video-overlay"></div>
      </div>

      <div className="login-box">
        <h1>Welcome to<br />AstroGuide</h1>
        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
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
                disabled={isLoading}
              >
                <option value="">Select your zodiac sign</option>
                {zodiacSigns.map(sign => (
                  <option key={sign} value={sign}>{sign}</option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <button 
          className="toggle-btn" 
          onClick={toggleForm}
          disabled={isLoading}
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;

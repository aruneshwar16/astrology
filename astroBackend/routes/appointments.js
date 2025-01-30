import express from 'express';
import auth from '../middleware/auth.js';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Book a new appointment
router.post('/book', auth, async (req, res) => {
  try {
    console.log('Booking appointment request received:', {
      ...req.body,
      userId: req.user.userId
    });

    const { name, email, phone, date, time, consultationType, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !date || !time || !consultationType) {
      return res.status(400).json({
        message: 'Please provide all required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format'
      });
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: 'Invalid phone number format. Please enter 10 digits'
      });
    }

    // Validate date
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return res.status(400).json({
        message: 'Please select a future date'
      });
    }

    // Create new appointment
    const appointment = new Appointment({
      userId: req.user.userId,
      name,
      email,
      phone,
      date,
      time,
      consultationType,
      message: message || ''
    });

    // Save appointment
    console.log('Saving appointment...');
    const savedAppointment = await appointment.save();
    console.log('Appointment saved successfully:', savedAppointment);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: savedAppointment
    });
  } catch (error) {
    console.error('Error booking appointment:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    // Handle MongoDB errors
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      return res.status(500).json({
        message: 'Database operation failed. Please try again.'
      });
    }

    res.status(500).json({
      message: 'Server error while booking appointment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user's appointments
router.get('/my-appointments', auth, async (req, res) => {
  try {
    console.log('Fetching appointments for user:', req.user.userId);
    
    const appointments = await Appointment.find({ userId: req.user.userId })
      .sort({ date: 1, time: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      message: 'Server error while fetching appointments',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;

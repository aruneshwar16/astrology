import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  },
  consultationType: {
    type: String,
    enum: ['video', 'audio', 'chat'],
    required: true
  },
  astrologer: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'bookAppointment' });

export default mongoose.model('Appointment', appointmentSchema);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Astrology API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', {
    message: err.message,
    stack: err.stack,
    details: err
  });
  
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
  autoIndex: true,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
};

// Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is not defined in .env file');
    }

    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password in logs
    
    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
    
    // Test database connection
    await mongoose.connection.db.admin().ping();
    console.log('✅ MongoDB Connected successfully');
    console.log('Database name:', mongoose.connection.name);

    // Start the server
    const PORT = process.env.PORT || 5852;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 API Documentation: http://localhost:${PORT}`);
      console.log(`🔒 Environment: ${process.env.NODE_ENV}`);
    });

  } catch (error) {
    console.error('❌ Server startup error:', error);
    if (error.name === 'MongoServerSelectionError') {
      console.error('Failed to connect to MongoDB. Please check:');
      console.error('1. MongoDB URI is correct');
      console.error('2. MongoDB server is running');
      console.error('3. Network connectivity to MongoDB server');
      console.error('4. MongoDB Atlas whitelist settings');
      console.error('5. Database user permissions');
    }
    process.exit(1);
  }
};

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  if (err.name === 'MongoNetworkError') {
    console.log('Attempting to reconnect to MongoDB...');
    mongoose.connect(process.env.MONGODB_URI, mongooseOptions).catch(console.error);
  }
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  mongoose.connect(process.env.MONGODB_URI, mongooseOptions).catch(console.error);
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected successfully');
});

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during app termination:', err);
    process.exit(1);
  }
});

// Start the server
startServer();

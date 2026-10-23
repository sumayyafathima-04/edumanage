import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware: Enable CORS for React frontend
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  })
);

// Middleware: Parse JSON bodies
app.use(express.json());

// API Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Student Management System API is running healthy.',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Root route welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Student Management System Backend API',
    endpoints: {
      auth: '/api/auth (register, login, me)',
      students: '/api/students (CRUD, stats)',
      health: '/api/health',
    },
  });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.originalUrl} not found on this server.`,
  });
});

// Global Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
======================================================
  STUDENT MANAGEMENT SYSTEM - BACKEND SERVER
======================================================
  Status:      Running
  Port:        ${PORT}
  Environment: ${process.env.NODE_ENV || 'development'}
  API Base:    http://localhost:${PORT}/api
  Health Check:http://localhost:${PORT}/api/health
======================================================
  `);
});

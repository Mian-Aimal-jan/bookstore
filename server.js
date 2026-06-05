const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/books');

dotenv.config();

const app = express();

// Middleware - Parse incoming JSON
app.use(express.json());

// Request Logger Middleware
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/books', bookRoutes);

// Test route (IMPORTANT for Vercel)
app.get('/', (req, res) => {
  res.send('Bookstore API is running 🚀');
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Connect to MongoDB (IMPORTANT)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ✅ EXPORT APP (THIS IS THE KEY CHANGE)
module.exports = app;
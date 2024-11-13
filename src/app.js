// src/app.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
//app.use('/api/auth', require('./routes/authRoutes'));

// Error Handling Middleware
app.use(errorHandler);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to BingeTime API');
});

module.exports = app;

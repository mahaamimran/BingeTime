// src/app.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to BingeTime API');
});

module.exports = app;

// src/routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const recommendationController = require('../controllers/recommendationController');

// Routes
router.get('/personalized', protect, recommendationController.getPersonalizedRecommendations);
router.get('/similar/:movieId', recommendationController.getSimilarTitles);
router.get('/trending', recommendationController.getTrendingMovies);
router.get('/top-rated', recommendationController.getTopRatedMovies);

module.exports = router;

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

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Recommendation system for personalized, trending, and top-rated movies
 */

/**
 * @swagger
 * /api/recommendations/personalized:
 *   get:
 *     summary: Get personalized movie recommendations for the user
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of personalized recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   genre:
 *                     type: array
 *                     items:
 *                       type: string
 *                   averageRating:
 *                     type: number
 *                   cast:
 *                     type: array
 *                     items:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/recommendations/similar/{movieId}:
 *   get:
 *     summary: Get movies similar to a specific movie
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of similar movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   genre:
 *                     type: array
 *                     items:
 *                       type: string
 *                   averageRating:
 *                     type: number
 *                   director:
 *                     type: string
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/recommendations/trending:
 *   get:
 *     summary: Get trending movies
 *     tags: [Recommendations]
 *     responses:
 *       200:
 *         description: List of trending movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   genre:
 *                     type: array
 *                     items:
 *                       type: string
 *                   averageRating:
 *                     type: number
 *                   coverPhoto:
 *                     type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/recommendations/top-rated:
 *   get:
 *     summary: Get top-rated movies
 *     tags: [Recommendations]
 *     responses:
 *       200:
 *         description: List of top-rated movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   genre:
 *                     type: array
 *                     items:
 *                       type: string
 *                   averageRating:
 *                     type: number
 *       500:
 *         description: Server error
 */

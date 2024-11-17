// src/routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

// Admin Operations
router.get('/reviews', protect, admin, movieController.getAllReviews); 
router.delete('/reviews/:id', protect, admin, movieController.deleteReview); 
router.get('/statistics/popular', protect, admin, movieController.getPopularMovies); 
router.get('/statistics/users', protect, admin, movieController.getMostActiveUsers); 
router.get('/statistics/genres', protect, admin, movieController.getTrendingGenres); 
router.get('/statistics/actors', protect, admin, movieController.getMostSearchedActors); 
router.get('/statistics/engagement', protect, admin, movieController.getUserEngagement); 

// No admin required
router.get('/', protect, movieController.getAllMovies);
router.get('/:id', protect, movieController.getMovieById);

// Movie Routes
router.post('/', protect, admin, movieController.addMovie);
router.put('/:id', protect, admin, movieController.updateMovie);
router.delete('/:id', protect, admin, movieController.deleteMovie);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management and statistics
 */

/**
 * @swagger
 * /api/movies/reviews:
 *   get:
 *     summary: Get all reviews for all movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all reviews
 *       404:
 *         description: No reviews found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a specific review by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies/statistics/popular:
 *   get:
 *     summary: Get the top 10 most popular movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of popular movies
 *       404:
 *         description: No popular movies found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies/statistics/users:
 *   get:
 *     summary: Get the most active users
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of most active users
 *       404:
 *         description: No active users found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies/statistics/genres:
 *   get:
 *     summary: Get the top 5 trending genres
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of trending genres
 *       404:
 *         description: No trending genres found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies/statistics/actors:
 *   get:
 *     summary: Get the top 10 most searched actors
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of most searched actors
 *       404:
 *         description: No searched actors found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies/statistics/engagement:
 *   get:
 *     summary: Get user engagement statistics
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User engagement statistics
 *       404:
 *         description: No engagement data found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get a list of all movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all movies
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *               director:
 *                 type: string
 *               cast:
 *                 type: array
 *                 items:
 *                   type: string
 *               crew:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get details of a specific movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Movie details retrieved
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */

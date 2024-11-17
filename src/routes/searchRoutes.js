// src/routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController.js');

// Routes for search and filtering
router.get('/', searchController.searchMovies);
router.get('/top-movies-of-month', searchController.getTopMoviesOfMonth);
router.get('/top-movies-by-genre', searchController.getTopMoviesByGenre);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search and filter movies
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search and filter movies based on various criteria
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Partial match for movie title
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter movies by genres (comma-separated)
 *       - in: query
 *         name: director
 *         schema:
 *           type: string
 *         description: Filter movies by director's ID
 *       - in: query
 *         name: actor
 *         schema:
 *           type: string
 *         description: Filter movies by actors' IDs (comma-separated)
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *         description: Minimum rating for filtering
 *       - in: query
 *         name: maxRating
 *         schema:
 *           type: number
 *         description: Maximum rating for filtering
 *       - in: query
 *         name: minYear
 *         schema:
 *           type: number
 *         description: Minimum release year for filtering
 *       - in: query
 *         name: maxYear
 *         schema:
 *           type: number
 *         description: Maximum release year for filtering
 *       - in: query
 *         name: decade
 *         schema:
 *           type: number
 *         description: Filter movies released in a specific decade (e.g., 1990 for the 1990s)
 *       - in: query
 *         name: countryOfOrigin
 *         schema:
 *           type: string
 *         description: Filter movies by country of origin
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter movies by language
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search for a keyword in movie synopsis or trivia
 *     responses:
 *       200:
 *         description: Movies retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/search/top-movies-of-month:
 *   get:
 *     summary: Retrieve the top-rated movies of the current month
 *     tags: [Search]
 *     responses:
 *       200:
 *         description: Top-rated movies of the month retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/search/top-movies-by-genre:
 *   get:
 *     summary: Retrieve the top-rated movies for a specific genre
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         required: true
 *         description: Genre to filter movies by
 *     responses:
 *       200:
 *         description: Top-rated movies by genre retrieved successfully
 *       400:
 *         description: Genre is required
 *       500:
 *         description: Server error
 */

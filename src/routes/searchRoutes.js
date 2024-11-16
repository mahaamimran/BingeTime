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
 * /api/search/:
 *   get:
 *     summary: Search and filter movies
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Title of the movie (partial match)
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Genre(s) (comma-separated)
 *       - in: query
 *         name: director
 *         schema:
 *           type: string
 *         description: Director's ID
 *       - in: query
 *         name: actor
 *         schema:
 *           type: string
 *         description: Actor(s) IDs (comma-separated)
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         description: Minimum average rating
 *       - in: query
 *         name: maxRating
 *         schema:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         description: Maximum average rating
 *       - in: query
 *         name: minYear
 *         schema:
 *           type: integer
 *         description: Minimum release year
 *       - in: query
 *         name: maxYear
 *         schema:
 *           type: integer
 *         description: Maximum release year
 *       - in: query
 *         name: decade
 *         schema:
 *           type: integer
 *         description: Release decade (e.g., 1990 for the 1990s)
 *       - in: query
 *         name: countryOfOrigin
 *         schema:
 *           type: string
 *         description: Country of origin
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Language
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword in synopsis or trivia
 *     responses:
 *       200:
 *         description: List of movies matching search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Server error
 */

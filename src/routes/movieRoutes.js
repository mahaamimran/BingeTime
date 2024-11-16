// src/routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

// Movie Routes
router.post('/', protect, admin, movieController.addMovie);
router.get('/', protect, movieController.getAllMovies);
router.get('/:id', protect, movieController.getMovieById);
router.put('/:id', protect, admin, movieController.updateMovie);
router.delete('/:id', protect, admin, movieController.deleteMovie);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management
 */

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []  # Requires Bearer token
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
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               runtime:
 *                 type: integer
 *               synopsis:
 *                 type: string
 *               coverPhoto:
 *                 type: string
 *               trivia:
 *                 type: array
 *                 items:
 *                   type: string
 *               goofs:
 *                 type: array
 *                 items:
 *                   type: string
 *               soundtrack:
 *                 type: array
 *                 items:
 *                   type: string
 *               ageRating:
 *                 type: string
 *               parentalGuidance:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie added successfully
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []  # Requires Bearer token
 *     responses:
 *       200:
 *         description: List of all movies
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []  # Requires Bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie details
 *       404:
 *         description: Movie not found
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []  # Requires Bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie ID
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
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               runtime:
 *                 type: integer
 *               synopsis:
 *                 type: string
 *               coverPhoto:
 *                 type: string
 *               trivia:
 *                 type: array
 *                 items:
 *                   type: string
 *               goofs:
 *                 type: array
 *                 items:
 *                   type: string
 *               soundtrack:
 *                 type: array
 *                 items:
 *                   type: string
 *               ageRating:
 *                 type: string
 *               parentalGuidance:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []  # Requires Bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Server error
 */


module.exports = router;

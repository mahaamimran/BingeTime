// src/routes/boxOfficeRoutes.js
const express = require('express');
const router = express.Router();
const boxOfficeController = require('../controllers/boxOfficeController');
const { protect } = require('../middlewares/authMiddleware');

// Box Office Routes
router.get('/box-office/:movieId', protect, boxOfficeController.getBoxOfficeDetails);
router.post('/box-office', protect, boxOfficeController.addBoxOfficeDetails);

// Award Routes
router.get('/awards', protect, boxOfficeController.getAwards);
router.post('/awards', protect, boxOfficeController.addAward);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Box Office and Awards
 *   description: Box office earnings and awards management for movies and people
 */

/**
 * @swagger
 * /api/box-office/box-office/{movieId}:
 *   get:
 *     summary: Get box office details for a specific movie
 *     tags: [Box Office and Awards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the movie to get box office details
 *     responses:
 *       200:
 *         description: Box office details retrieved successfully
 *       404:
 *         description: Box office details not found for this movie
 *       500:
 *         description: Failed to fetch box office details
 */

/**
 * @swagger
 * /api/box-office/box-office:
 *   post:
 *     summary: Add box office details for a movie
 *     tags: [Box Office and Awards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - openingWeekendEarnings
 *               - totalEarnings
 *               - internationalRevenue
 *             properties:
 *               movieId:
 *                 type: string
 *               openingWeekendEarnings:
 *                 type: number
 *               totalEarnings:
 *                 type: number
 *               internationalRevenue:
 *                 type: number
 *     responses:
 *       201:
 *         description: Box office details added successfully
 *       500:
 *         description: Failed to add box office details
 */

/**
 * @swagger
 * /api/box-office/awards:
 *   get:
 *     summary: Get awards for a movie or person
 *     tags: [Box Office and Awards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: movieId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the movie to get awards
 *       - in: query
 *         name: personId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the person to get awards
 *     responses:
 *       200:
 *         description: Awards retrieved successfully
 *       500:
 *         description: Failed to fetch awards
 *
 *   post:
 *     summary: Add an award
 *     tags: [Box Office and Awards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - year
 *               - type
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: number
 *               type:
 *                 type: string
 *                 description: Type of award (e.g., Oscar, Golden Globe)
 *               category:
 *                 type: string
 *                 description: Award category (e.g., Best Picture)
 *               movieId:
 *                 type: string
 *                 description: ID of the movie receiving the award
 *               personId:
 *                 type: string
 *                 description: ID of the person receiving the award
 *     responses:
 *       201:
 *         description: Award added successfully
 *       500:
 *         description: Failed to add award
 */

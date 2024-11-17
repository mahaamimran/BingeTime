// src/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware'); 

router.get('/upcoming', protect, notificationController.getUpcomingMovies);
router.post('/reminder', protect, notificationController.setReminder);
router.post('/send-notifications', protect, notificationController.sendNotifications);
router.get('/dashboard', protect, notificationController.getDashboardNotifications);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications and reminders
 */

/**
 * @swagger
 * /api/notifications/upcoming:
 *   get:
 *     summary: Fetch upcoming movies
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of upcoming movies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   releaseDate:
 *                     type: string
 *                     format: date
 *                   genre:
 *                     type: string
 *       500:
 *         description: Failed to fetch upcoming movies
 */

/**
 * @swagger
 * /api/notifications/reminder:
 *   post:
 *     summary: Set a reminder for a movie
 *     tags: [Notifications]
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
 *               - type
 *             properties:
 *               movieId:
 *                 type: string
 *                 description: ID of the movie to set a reminder for
 *               type:
 *                 type: string
 *                 description: Type of reminder (e.g., email, push notification)
 *     responses:
 *       200:
 *         description: Reminder set successfully
 *       500:
 *         description: Failed to set reminder
 */

/**
 * @swagger
 * /api/notifications/send-notifications:
 *   post:
 *     summary: Mark notifications as sent
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications marked as sent successfully
 *       500:
 *         description: Failed to update notifications
 */

/**
 * @swagger
 * /api/notifications/dashboard:
 *   get:
 *     summary: Fetch notifications for the user's dashboard
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   movieId:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       releaseDate:
 *                         type: string
 *                         format: date
 *                   isSent:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Failed to fetch dashboard notifications
 */

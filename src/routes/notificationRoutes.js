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

// src/controllers/notificationsController.js

const Movie = require('../models/Movie');
const Notification = require('../models/Notification');

// Fetch upcoming movies
const getUpcomingMovies = async (req, res) => {
  try {
    const today = new Date();
    const upcomingMovies = await Movie.find({ releaseDate: { $gte: today } }).select(
      'title releaseDate genre'
    );
    res.status(200).json(upcomingMovies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upcoming movies.' });
  }
};

// Set a reminder for a user
const setReminder = async (req, res) => {
  const { movieId, type } = req.body;

  try {
    const notification = new Notification({
      userId: req.user._id, // Automatically set userId from authenticated user
      movieId,
      type,
    });

    await notification.save();
    res.status(200).json({ message: 'Reminder set successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to set reminder.' });
  }
};

// Mark notifications as sent for dashboard
const sendNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ isSent: false }).populate('userId movieId');

    for (const notification of notifications) {
      // Mark the notification as sent
      notification.isSent = true;
      await notification.save();
    }

    res.status(200).json({ message: 'Notifications updated for dashboard.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notifications.' });
  }
};

// Get notifications for the user's dashboard
const getDashboardNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .populate('movieId', 'title releaseDate')
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard notifications.' });
  }
};

module.exports = {
  getUpcomingMovies,
  setReminder,
  sendNotifications,
  getDashboardNotifications,
};

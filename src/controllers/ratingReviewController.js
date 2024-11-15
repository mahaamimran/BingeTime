// src/controllers/ratingReviewController.js
const RatingReview = require('../models/RatingReview');
const Movie = require('../models/Movie');

// add or update a rating and review
const addOrUpdateRatingReview = async (req, res) => {
  try {
    const { movieId, rating, review } = req.body;
    const userId = req.user._id;

    // find existing rating/review by this user for this movie
    let ratingReview = await RatingReview.findOne({ userId, movieId });

    if (ratingReview) {
      // Update the existing review
      ratingReview.rating = rating;
      ratingReview.review = review;
      ratingReview.updatedAt = Date.now();
    } else {
      // Create a new rating and review
      ratingReview = new RatingReview({ userId, movieId, rating, review });
    }

    await ratingReview.save();
    res.status(200).json(ratingReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all ratings and reviews for a specific movie
const getMovieRatingsReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const ratingsReviews = await RatingReview.find({ movieId }).populate('userId', 'name');
    res.status(200).json(ratingsReviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a user's review for a specific movie
const getUserRatingReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;
    const ratingReview = await RatingReview.findOne({ userId, movieId });

    if (!ratingReview) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(ratingReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addOrUpdateRatingReview,
  getMovieRatingsReviews,
  getUserRatingReview,
};

const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const ratingReviewController = require('../controllers/ratingReviewController');

// all routes 
router.get('/movie/:movieId', ratingReviewController.getMovieRatingsReviews);

// protected routes
router.post('/', protect, ratingReviewController.addOrUpdateRatingReview);
router.delete('/:movieId', protect, ratingReviewController.deleteRatingReview);
router.get('/user/:movieId', protect, ratingReviewController.getUserRatingReview);

module.exports = router;

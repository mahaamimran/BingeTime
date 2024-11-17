// src/routes/ratingReviewRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const ratingReviewController = require('../controllers/ratingReviewController');

// Public routes
router.get('/movie/:movieId', ratingReviewController.getMovieRatingsReviews);

// Protected routes
router.post('/', protect, ratingReviewController.addOrUpdateRatingReview);
router.delete('/:movieId', protect, ratingReviewController.deleteRatingReview);
router.get('/user/:movieId', protect, ratingReviewController.getUserRatingReview);

// Likes and Comments routes
router.get('/:movieId/top-rated', protect, ratingReviewController.getTopRatedReviews);
router.get('/:movieId/most-discussed', protect, ratingReviewController.getMostDiscussedReviews);
router.post('/:reviewId/like', protect, ratingReviewController.addLikeToReview);
router.post('/:reviewId/comment', protect, ratingReviewController.addCommentToReview);
router.get('/:reviewId/comments', ratingReviewController.getCommentsForReview);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Rating & Reviews
 *   description: API for managing ratings and reviews for movies
 */

/**
 * @swagger
 * /api/rating-reviews/movie/{movieId}:
 *   get:
 *     summary: Get all ratings and reviews for a specific movie
 *     tags: [Rating & Reviews]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of ratings and reviews retrieved
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews:
 *   post:
 *     summary: Add or update a rating and review for a movie
 *     tags: [Rating & Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *               rating:
 *                 type: number
 *               review:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rating and review added/updated
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/{movieId}:
 *   delete:
 *     summary: Delete a rating and review for a specific movie
 *     tags: [Rating & Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rating and review deleted
 *       404:
 *         description: Rating and review not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/user/{movieId}:
 *   get:
 *     summary: Get a user's rating and review for a specific movie
 *     tags: [Rating & Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rating and review retrieved
 *       404:
 *         description: Rating and review not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/{movieId}/top-rated:
 *   get:
 *     summary: Get top-rated reviews for a specific movie
 *     tags: [Rating & Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Top-rated reviews retrieved
 *       404:
 *         description: No reviews found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/{movieId}/most-discussed:
 *   get:
 *     summary: Get most discussed reviews for a specific movie
 *     tags: [Rating & Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Most discussed reviews retrieved
 *       404:
 *         description: No reviews found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/{reviewId}/like:
 *   post:
 *     summary: Add a like to a review
 *     tags: [Rating & Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like added to review
 *       404:
 *         description: Review not found
 *       400:
 *         description: You have already liked this review
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/{reviewId}/comment:
 *   post:
 *     summary: Add a comment to a review
 *     tags: [Rating & Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added to review
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/{reviewId}/comments:
 *   get:
 *     summary: Get all comments for a review
 *     tags: [Rating & Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */

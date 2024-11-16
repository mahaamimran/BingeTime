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
 *   - name: RatingReviews
 *     description: "Operations related to movie ratings and reviews"
 */

/**
 * @swagger
 * /api/rating-reviews/:
 *   post:
 *     summary: Add or update a rating and review
 *     tags: [RatingReviews]
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
 *                 description: The ID of the movie being rated/reviewed
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: The rating given by the user (1-5)
 *               review:
 *                 type: string
 *                 description: The review text provided by the user
 *     responses:
 *       200:
 *         description: Rating and review successfully added or updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rating and review saved
 *                 ratingReview:
 *                   $ref: '#/components/schemas/RatingReview'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/{movieId}:
 *   delete:
 *     summary: Delete a user's rating and review for a specific movie
 *     tags: [RatingReviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie
 *     responses:
 *       200:
 *         description: Rating and review deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rating and review deleted
 *       404:
 *         description: Rating and review not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/movie/{movieId}:
 *   get:
 *     summary: Get all ratings and reviews for a specific movie
 *     tags: [RatingReviews]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie
 *     responses:
 *       200:
 *         description: List of ratings and reviews for the movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RatingReview'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/rating-reviews/user/{movieId}:
 *   get:
 *     summary: Get the authenticated user's rating and review for a specific movie
 *     tags: [RatingReviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie
 *     responses:
 *       200:
 *         description: The user's rating and review for the specified movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingReview'
 *       404:
 *         description: Rating and review not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RatingReview:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the rating/review
 *         userId:
 *           type: string
 *           description: The ID of the user who posted the rating/review
 *         movieId:
 *           type: string
 *           description: The ID of the movie being rated/reviewed
 *         rating:
 *           type: number
 *           description: The rating given by the user (1-5)
 *         review:
 *           type: string
 *           description: The review text provided by the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the rating/review was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the rating/review was last updated
 */

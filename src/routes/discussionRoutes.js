// src/routes/discussionRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const discussionController = require('../controllers/discussionController');

// Discussion routes
router.get('/', protect, discussionController.getDiscussions); 
router.post('/', protect, discussionController.createDiscussion); 
router.get('/:id', protect, discussionController.getDiscussionById); 
router.delete('/:id', protect, discussionController.deleteDiscussion); 

// Comment routes
router.post('/:id/comment', protect, discussionController.addComment); 
router.delete('/:id/comment/:commentId', protect, discussionController.deleteComment); 

// Like/Unlike routes
router.post('/:id/like', protect, discussionController.likeDiscussion); 
router.post('/:id/unlike', protect, discussionController.unlikeDiscussion); 
router.post('/:id/comment/:commentId/like', protect, discussionController.likeComment); 
router.post('/:id/comment/:commentId/unlike', protect, discussionController.unlikeComment); 

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Discussions
 *   description: Discussion management for movies and actors
 */

/**
 * @swagger
 * /api/discussions:
 *   get:
 *     summary: Fetch all discussions
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all discussions
 *       500:
 *         description: Failed to fetch discussions
 *
 *   post:
 *     summary: Create a new discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               genre:
 *                 type: string
 *               movieId:
 *                 type: string
 *               actorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Discussion created successfully
 *       500:
 *         description: Failed to create discussion
 */

/**
 * @swagger
 * /api/discussions/{id}:
 *   get:
 *     summary: Fetch a specific discussion by ID
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Discussion retrieved
 *       404:
 *         description: Discussion not found
 *       500:
 *         description: Failed to fetch discussion
 *
 *   delete:
 *     summary: Delete a specific discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Discussion deleted
 *       403:
 *         description: Not authorized to delete this discussion
 *       404:
 *         description: Discussion not found
 *       500:
 *         description: Failed to delete discussion
 */

/**
 * @swagger
 * /api/discussions/{id}/comment:
 *   post:
 *     summary: Add a comment to a discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Discussion not found
 *       500:
 *         description: Failed to add comment
 */

/**
 * @swagger
 * /api/discussions/{id}/comment/{commentId}:
 *   delete:
 *     summary: Delete a specific comment
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Not authorized to delete this comment
 *       404:
 *         description: Discussion or comment not found
 *       500:
 *         description: Failed to delete comment
 */

/**
 * @swagger
 * /api/discussions/{id}/like:
 *   post:
 *     summary: Like a discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Discussion liked successfully
 *       400:
 *         description: Already liked this discussion
 *       404:
 *         description: Discussion not found
 *       500:
 *         description: Failed to like discussion
 */

/**
 * @swagger
 * /api/discussions/{id}/unlike:
 *   post:
 *     summary: Unlike a discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Discussion unliked successfully
 *       400:
 *         description: You have not liked this discussion
 *       404:
 *         description: Discussion not found
 *       500:
 *         description: Failed to unlike discussion
 */

/**
 * @swagger
 * /api/discussions/{id}/comment/{commentId}/like:
 *   post:
 *     summary: Like a specific comment
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comment liked successfully
 *       400:
 *         description: Already liked this comment
 *       404:
 *         description: Discussion or comment not found
 *       500:
 *         description: Failed to like comment
 */

/**
 * @swagger
 * /api/discussions/{id}/comment/{commentId}/unlike:
 *   post:
 *     summary: Unlike a specific comment
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comment unliked successfully
 *       400:
 *         description: You have not liked this comment
 *       404:
 *         description: Discussion or comment not found
 *       500:
 *         description: Failed to unlike comment
 */

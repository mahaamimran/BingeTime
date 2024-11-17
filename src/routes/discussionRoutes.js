const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const discussionController = require('../controllers/discussionController');

router.get('/', protect, discussionController.getDiscussions); // Get all discussions
router.post('/', protect, discussionController.createDiscussion); // Create a new discussion
router.get('/:id', protect, discussionController.getDiscussionById); // Get a specific discussion
router.post('/:id/comment', protect, discussionController.addComment); // Add a comment to a discussion
router.post('/:id/like', protect, discussionController.likeDiscussion); // Like a discussion
router.post('/:id/comment/:commentId/like', protect, discussionController.likeComment); // Like a comment

module.exports = router;

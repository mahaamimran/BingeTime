const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const discussionController = require('../controllers/discussionController');

router.get('/', protect, discussionController.getDiscussions); 
router.post('/', protect, discussionController.createDiscussion); 
router.get('/:id', protect, discussionController.getDiscussionById); 
router.delete('/:id', protect, discussionController.deleteDiscussion); 
router.post('/:id/comment', protect, discussionController.addComment); 
router.delete('/:id/comment/:commentId', protect, discussionController.deleteComment); 
router.post('/:id/like', protect, discussionController.likeDiscussion); 
router.post('/:id/unlike', protect, discussionController.unlikeDiscussion); 
router.post('/:id/comment/:commentId/like', protect, discussionController.likeComment); 
router.post('/:id/comment/:commentId/unlike', protect, discussionController.unlikeComment); 

module.exports = router;

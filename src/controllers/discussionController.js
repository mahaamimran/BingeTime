const Discussion = require('../models/Discussion');

// Get all discussions
const getDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .populate('creatorId', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch discussions.' });
    }
};

// Create a new discussion
const createDiscussion = async (req, res) => {
    const { title, description, genre, movieId, actorId } = req.body;

    try {
        const discussion = new Discussion({
            title,
            description,
            genre,
            movieId,
            actorId,
            creatorId: req.user._id,
        });

        await discussion.save();
        res.status(201).json(discussion);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create discussion.' });
    }
};

// Get a specific discussion by ID
const getDiscussionById = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id)
            .populate('creatorId', 'name')
            .populate('comments.userId', 'name');
        if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch discussion.' });
    }
};

// Delete a discussion
const deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });

        if (discussion.creatorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this discussion.' });
        }

        await discussion.deleteOne();
        res.status(200).json({ message: 'Discussion deleted.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete discussion.' });
    }
};

// Add a comment to a discussion
const addComment = async (req, res) => {
    const { content } = req.body;

    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });

        const comment = {
            userId: req.user._id,
            content,
        };

        discussion.comments.push(comment);
        await discussion.save();
        res.status(201).json(discussion);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment.' });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });

        const comment = discussion.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found.' });

        if (comment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this comment.' });
        }

        comment.deleteOne();
        await discussion.save();
        res.status(200).json({ message: 'Comment deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment.' });
    }
};

// Like a discussion
const likeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });

        if (discussion.likedBy.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already liked this discussion.' });
        }

        discussion.likedBy.push(req.user._id);
        discussion.likes += 1;
        await discussion.save();

        res.status(200).json({ message: 'Discussion liked.', likes: discussion.likes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to like discussion.' });
    }
};

// Unlike a discussion
const unlikeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });

        const userIndex = discussion.likedBy.indexOf(req.user._id);
        if (userIndex === -1) {
            return res.status(400).json({ message: 'You have not liked this discussion.' });
        }

        discussion.likedBy.splice(userIndex, 1);
        discussion.likes -= 1;
        await discussion.save();

        res.status(200).json({ message: 'Discussion unliked.', likes: discussion.likes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to unlike discussion.' });
    }
};
// like a comment
const likeComment = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });

        const comment = discussion.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found.' });

        // Check if the user has already liked the comment
        if (comment.likedBy && comment.likedBy.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already liked this comment.' });
        }

        // Initialize likedBy array if it doesn't exist
        if (!comment.likedBy) {
            comment.likedBy = [];
        }

        // Add user to likedBy array and increment likes
        comment.likedBy.push(req.user._id);
        comment.likes += 1;
        await discussion.save();

        res.status(200).json({ message: 'Comment liked.', likes: comment.likes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to like comment.' });
    }
};
//unlike
const unlikeComment = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });

        const comment = discussion.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found.' });

        // Check if the user has liked the comment
        if (!comment.likedBy || !comment.likedBy.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have not liked this comment.' });
        }

        // Remove user from likedBy array and decrement likes
        comment.likedBy = comment.likedBy.filter((userId) => userId.toString() !== req.user._id.toString());
        comment.likes -= 1;
        await discussion.save();

        res.status(200).json({ message: 'Comment unliked.', likes: comment.likes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to unlike comment.' });
    }
};



module.exports = {
    getDiscussions,
    createDiscussion,
    getDiscussionById,
    deleteDiscussion,
    addComment,
    deleteComment,
    likeDiscussion,
    unlikeDiscussion,
    likeComment,
    unlikeComment,
};

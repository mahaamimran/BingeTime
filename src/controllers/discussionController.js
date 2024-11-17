// src/controllers/discussionController.js
const Discussion = require('../models/Discussion');
const Movie = require('../models/Movie');
const Person = require('../models/Person');

// Get all discussions
const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('creatorId', 'name').sort({ createdAt: -1 });
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

// Like a discussion
const likeDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });

    discussion.likes += 1;
    await discussion.save();
    res.status(200).json({ message: 'Discussion liked.', likes: discussion.likes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to like discussion.' });
  }
};

// Like a comment
const likeComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: 'Discussion not found.' });

    const comment = discussion.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found.' });

    comment.likes += 1;
    await discussion.save();
    res.status(200).json({ message: 'Comment liked.', likes: comment.likes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to like comment.' });
  }
};

module.exports = {
  getDiscussions,
  createDiscussion,
  getDiscussionById,
  addComment,
  likeDiscussion,
  likeComment,
};

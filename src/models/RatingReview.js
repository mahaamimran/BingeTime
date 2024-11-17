// src/models/RatingReview.js
const mongoose = require('mongoose');

const RatingReviewSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: function () {
      return !!this.review; // require rating only if review exists
    },
  },  
  review: {
    type: String,
    trim: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Ensure comments are always linked to a user
      },
      comment: {
        type: String,
        trim: true,
        required: true, // Ensure the comment text is required
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ]

}, { timestamps: true });

module.exports = mongoose.model('RatingReview', RatingReviewSchema);

// src/models/Trending.js
const mongoose = require('mongoose');

const TrendingSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    weight: {
      type: Number, // Weight based on likes, reviews, and ratings
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Trending', TrendingSchema);

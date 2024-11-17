// src/models/Article.js
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie', // Reference to the Movie schema
  },
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person', // Reference to the Person schema
  },
  author: {
    type: String, // The author of the article
  },
  tags: [String], // Keywords for search or categorization
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Article', ArticleSchema);

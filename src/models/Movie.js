// src/models/Movie.js
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: [String],
  director: {
    type: String,
    required: true,
  },
  cast: [String],
  releaseDate: Date,
  runtime: Number, // in minutes
  synopsis: String,
  averageRating: {
    type: Number,
    default: 0,
  },
  coverPhoto: String, // URL for the movie cover photo
  trivia: [String],
  goofs: [String],
  soundtrack: [String],
  ageRating: String, // e.g., "PG-13"
  parentalGuidance: String, // details for parental guidance
}, {
  timestamps: true,
});

module.exports = mongoose.model('Movie', MovieSchema);

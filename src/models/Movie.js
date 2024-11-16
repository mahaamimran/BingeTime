// src/models/Movie.js
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: [String],
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person', // Reference to Person schema with role 'Director'
  },
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person', // Reference to Person schema with role 'Actor'
    },
  ],
  crew: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person', // Reference to Person schema with role 'Crew'
    },
  ],
  releaseDate: Date,
  runtime: Number, // in minutes
  synopsis: String,
  averageRating: {
    type: Number,
    default: 0,
  },
  ratingsCount: {
    type: Number,
    default: 0,
  },
  coverPhoto: String, // URL for the movie cover photo
  trivia: [String],
  goofs: [String],
  soundtrack: [String],
  ageRating: String, // e.g., "PG-13"
  parentalGuidance: String, // Parental guidance details
}, {
  timestamps: true,
});

module.exports = mongoose.model('Movie', MovieSchema);

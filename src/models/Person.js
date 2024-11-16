// src/models/Person.js
const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  biography: String,
  filmography: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie', // Reference to Movie schema
    },
  ],
  awards: [String],
  photos: [String], // URLs for photos
  role: {
    type: String,
    enum: ['Director', 'Actor', 'Crew'], // Role can only be one of these
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Person', PersonSchema);

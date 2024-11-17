const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, enum: ['Win', 'Nomination'], required: true }, // 'Win' or 'Nomination'
  category: { type: String, required: true }, // e.g., Best Actor, Best Picture
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Award', AwardSchema);

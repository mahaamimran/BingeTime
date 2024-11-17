const mongoose = require('mongoose');

const BoxOfficeSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    openingWeekendEarnings: { type: Number, required: true }, // in USD
    totalEarnings: { type: Number, required: true }, // in USD
    internationalRevenue: { type: Number, required: true }, // in USD
}, {
    timestamps: true,
});

module.exports = mongoose.model('BoxOffice', BoxOfficeSchema);

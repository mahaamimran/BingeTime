const RatingReview = require('../models/RatingReview');
const Movie = require('../models/Movie');

// Add or update a rating and review
const addOrUpdateRatingReview = async (req, res) => {
  try {
    const { movieId, rating, review } = req.body;
    const userId = req.user._id;

    let ratingReview = await RatingReview.findOne({ userId, movieId });

    if (ratingReview) {
      // existing checked based on userId and movieId
      ratingReview.rating = rating;
      ratingReview.review = review;
      ratingReview.updatedAt = new Date();
      await ratingReview.save();
    } else {
      // new rating and review
      ratingReview = new RatingReview({ userId, movieId, rating, review });
      await ratingReview.save();

      // increment the ratingsCount in Movie model
      await Movie.findByIdAndUpdate(movieId, { $inc: { ratingsCount: 1 } });
    }

    // recalculate average rating for the movie
    const movieRatings = await RatingReview.find({ movieId });
    const totalRating = movieRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / movieRatings.length;

    await Movie.findByIdAndUpdate(movieId, { averageRating });

    res.status(200).json({ message: 'Rating and review saved', ratingReview });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// delete a rating and review
const deleteRatingReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;

    const ratingReview = await RatingReview.findOneAndDelete({ userId, movieId });
    if (!ratingReview) return res.status(404).json({ message: 'Rating and review not found' });

    // decrement the ratingsCount in Movie model
    await Movie.findByIdAndUpdate(movieId, { $inc: { ratingsCount: -1 } });

    // recalculate average rating for the movie
    const movieRatings = await RatingReview.find({ movieId });
    const totalRating = movieRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = movieRatings.length ? totalRating / movieRatings.length : 0;

    await Movie.findByIdAndUpdate(movieId, { averageRating });

    res.status(200).json({ message: 'Rating and review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// get all ratings and reviews for a specific movie
const getMovieRatingsReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const ratingsReviews = await RatingReview.find({ movieId }).populate('userId', 'name');

    res.status(200).json(ratingsReviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's rating and review for a specific movie
const getUserRatingReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;

    const ratingReview = await RatingReview.findOne({ userId, movieId });
    if (!ratingReview) return res.status(404).json({ message: 'Rating and review not found' });

    res.status(200).json(ratingReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addOrUpdateRatingReview,
  deleteRatingReview,
  getMovieRatingsReviews,
  getUserRatingReview,
};

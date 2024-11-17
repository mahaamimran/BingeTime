const RatingReview = require('../models/RatingReview');
const Movie = require('../models/Movie');
const Trending = require('../models/Trending');
const User = require('../models/User');

// Recalculate user score (only used in this controller)
const recalculateUserScore = async (userId) => {
  try {
    // Count likes for the user's reviews
    const userReviews = await RatingReview.find({ userId });
    const totalLikes = userReviews.reduce((sum, review) => sum + review.likes, 0);

    // Count the total number of comments across all reviews
    const totalComments = userReviews.reduce((sum, review) => sum + review.comments.length, 0);

    // Total number of reviews
    const totalReviews = userReviews.length;

    // Calculate the engagement score
    const engagementScore = totalLikes + totalComments + totalReviews;

    // Update the user's activity score
    await User.findByIdAndUpdate(userId, { engagementScore }, { new: true });
  } catch (error) {
    console.error('Error recalculating user score:', error);
  }
};

// not direectly used in routes, used when a user rates a movie
const updateTrendingWeight = async (movieId) => {
  try {
    // Fetch movie details
    const movie = await Movie.findById(movieId);

    // Fetch all reviews for the movie
    const reviews = await RatingReview.find({ movieId });

    // Calculate total likes on reviews
    const totalLikes = reviews.reduce((sum, review) => sum + review.likes, 0);

    // Calculate weight
    const weight = (movie.averageRating * 10) + (movie.ratingsCount * 2) + totalLikes;

    // Update or create trending entry
    await Trending.findOneAndUpdate(
      { movie: movieId },
      { weight },
      { upsert: true, new: true } // Create entry if not exists
    );
  } catch (error) {
    console.error('Error updating trending weight:', error);
  }
};

// add/update a rating and review
const addOrUpdateRatingReview = async (req, res) => {
  try {
    const { movieId, rating, review } = req.body;
    const userId = req.user._id;

    let ratingReview = await RatingReview.findOne({ userId, movieId });

    if (ratingReview) {
      // Update existing rating and review
      ratingReview.rating = rating;
      ratingReview.review = review;
      ratingReview.updatedAt = new Date();
      await ratingReview.save();
    } else {
      // Add new rating and review
      ratingReview = new RatingReview({ userId, movieId, rating, review });
      await ratingReview.save();

      // Increment the ratingsCount in the Movie model
      await Movie.findByIdAndUpdate(movieId, { $inc: { ratingsCount: 1 } });
    }

    // Recalculate average rating for the movie
    const movieRatings = await RatingReview.find({ movieId });
    const totalRating = movieRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / movieRatings.length;

    await Movie.findByIdAndUpdate(movieId, { averageRating });

    // Update trending weight
    await updateTrendingWeight(movieId);

    // Recalculate user score
    await recalculateUserScore(userId);

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

    // Decrement the ratingsCount in the Movie model
    await Movie.findByIdAndUpdate(movieId, { $inc: { ratingsCount: -1 } });

    // Recalculate average rating for the movie
    const movieRatings = await RatingReview.find({ movieId });
    const totalRating = movieRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = movieRatings.length ? totalRating / movieRatings.length : 0;

    await Movie.findByIdAndUpdate(movieId, { averageRating });

    // Update trending weight
    await updateTrendingWeight(movieId);

    // Recalculate user score
    await recalculateUserScore(userId);

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

// get user's rating and review for a specific movie
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

// Top Rated Reviews
const getTopRatedReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Find reviews for the movie, sort by likes first, then by rating
    const topRatedReviews = await RatingReview.find({ movieId })
      .sort({ likes: -1, rating: -1 }) // Sort by likes first, then by rating
      .populate('userId', 'name'); // Populate user details (e.g., name)

    // If no reviews exist, return an empty array
    if (!topRatedReviews || topRatedReviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    res.status(200).json(topRatedReviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// mosr discussed reviews
const getMostDiscussedReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Find reviews for the movie, sort by the number of comments first, then by likes
    const mostDiscussedReviews = await RatingReview.find({ movieId })
      .sort({ 'comments.length': -1, likes: -1 }) // Sort by comments first, then by likes
      .populate('userId', 'name') // Populate user details (e.g., name)
      .populate('comments.userId', 'name'); // Populate user details for comments

    // If no reviews exist, return an empty array
    if (!mostDiscussedReviews || mostDiscussedReviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    res.status(200).json(mostDiscussedReviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// like a review
const addLikeToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await RatingReview.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Check if the user has already liked the review
    if (review.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this review' });
    }

    // Add the user's ID to the likes array
    review.likes.push(userId);
    await review.save();

    // Optionally, recalculate the user score for the review owner
    await recalculateUserScore(review.userId);

    res.status(200).json({ message: 'Like added to review', review });
  } catch (error) {
    console.error('Error adding like to review:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
};



// add comment
const addCommentToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment } = req.body;
    const userId = req.user._id;

    const review = await RatingReview.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.comments.push({ userId, comment });
    await review.save();

    // Recalculate the score for the review owner
    await recalculateUserScore(review.userId);

    res.status(200).json({ message: 'Comment added to review', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// get comments
const getCommentsForReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await RatingReview.findById(reviewId).populate('comments.userId', 'name');
    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.status(200).json({ comments: review.comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addOrUpdateRatingReview,
  deleteRatingReview,
  getMovieRatingsReviews,
  getUserRatingReview,
  getTopRatedReviews,
  getMostDiscussedReviews,
  addLikeToReview,
  addCommentToReview,
  getCommentsForReview,
  recalculateUserScore,
};

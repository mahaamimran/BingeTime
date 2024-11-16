const Movie = require('../models/Movie');
const User = require('../models/User');
const RatingReview = require('../models/RatingReview');
const Trending = require('../models/Trending');

// persinalised recommendations
const getPersonalizedRecommendations = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        // this is based on a users favorite genres and actors
        const { favoriteGenres, favoriteActors } = user.preferences;

        // movies and case with the same genre OR actor
        const recommendations = await Movie.find({
            $or: [
                { genre: { $in: favoriteGenres } },
                { cast: { $in: favoriteActors } },
            ],
        })
            .sort({ averageRating: -1 }) // sort by highest ratings
            .limit(5);

        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// similar titles
const getSimilarTitles = async (req, res) => {
    try {
        const { movieId } = req.params;

        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        const similarMovies = await Movie.find({
            _id: { $ne: movieId }, // mocies besides the current one
            $or: [
                { genre: { $in: movie.genre } },
                { director: movie.director },
            ],
        })
            .sort({ averageRating: -1 }) // sort baserd on highest ratings
            .limit(5);

        res.status(200).json(similarMovies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// trending movies
const getTrendingMovies = async (req, res) => {
    try {
        const trendingMovies = await Trending.find()
            .sort({ weight: -1 }) // sort by weight
            .populate('movie', 'title genre averageRating coverPhoto') // populate movie details
            .limit(10);

        res.status(200).json(trendingMovies.map((t) => t.movie));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// top rated movies
const getTopRatedMovies = async (req, res) => {
    try {
        const topRatedMovies = await Movie.find()
            .sort({ averageRating: -1 }) // sort by highest ratings
            .limit(10);

        res.status(200).json(topRatedMovies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getPersonalizedRecommendations,
    getSimilarTitles,
    getTrendingMovies,
    getTopRatedMovies,
};

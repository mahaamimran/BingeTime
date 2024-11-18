const Movie = require('../models/Movie');
const RatingReview = require('../models/RatingReview'); 
const Person = require('../models/Person');
const User = require('../models/User');

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const { title, genre, director, cast, crew, ...rest } = req.body;

    // Validate director
    const directorExists = await Person.findOne({ _id: director, role: 'Director' });
    if (!directorExists) return res.status(400).json({ message: 'Invalid director ID' });

    // Validate cast
    for (const actorId of cast) {
      const actorExists = await Person.findOne({ _id: actorId, role: 'Actor' });
      if (!actorExists) return res.status(400).json({ message: `Invalid actor ID: ${actorId}` });
    }

    // Validate crew
    for (const crewId of crew) {
      const crewExists = await Person.findOne({ _id: crewId, role: 'Crew' });
      if (!crewExists) return res.status(400).json({ message: `Invalid crew ID: ${crewId}` });
    }

    // Create movie
    const movie = await Movie.create({ title, genre, director, cast, crew, ...rest });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// det all movies with pagination
const getAllMovies = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 items per page
  
      // Parse the page and limit as integers
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
  
      // Calculate the number of movies to skip
      const skip = (pageNumber - 1) * limitNumber;
  
      // Fetch movies with pagination
      const movies = await Movie.find()
        .populate('director', 'name')
        .populate('cast', 'name')
        .populate('crew', 'name')
        .skip(skip)
        .limit(limitNumber);
  
      // Count total movies
      const totalMovies = await Movie.countDocuments();
  
      res.status(200).json({
        movies,
        totalMovies,
        totalPages: Math.ceil(totalMovies / limitNumber),
        currentPage: pageNumber,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get a movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('director', 'name')
      .populate('cast', 'name')
      .populate('crew', 'name');

    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a movie by ID
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a movie by ID
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllReviews = async (req, res) => {
    try {
      // Use the correct model name
      const reviews = await RatingReview.find()
        .populate('movieId', 'title') // Ensure `title` exists in the Movie schema
        .populate('userId', 'name'); // Ensure `name` exists in the User schema
  
      if (!reviews.length) {
        return res.status(404).json({ message: 'No reviews found.' });
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error.message, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Delete a review
const deleteReview = async (req, res) => {
    try {
      const review = await RatingReview.findByIdAndDelete(req.params.id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error.message, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get popular movies
const getPopularMovies = async (req, res) => {
    try {
      const movies = await Movie.find({ averageRating: { $gt: 0 } })
        .sort({ averageRating: -1 })
        .limit(10)
        .select('title averageRating coverPhoto');
      if (!movies.length) return res.status(404).json({ message: 'No popular movies found' });
  
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error fetching popular movies:', error.message, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get most active users
const getMostActiveUsers = async (req, res) => {
    try {
      const users = await User.aggregate([
        {
          $project: {
            name: 1,
            activityScore: {
              $add: [
                { $size: { $ifNull: ['$likes', []] } },
                { $size: { $ifNull: ['$comments', []] } },
                { $size: { $ifNull: ['$reviews', []] } },
              ],
            },
          },
        },
        { $sort: { activityScore: -1 } },
        { $limit: 10 },
      ]);
  
      if (!users.length) return res.status(404).json({ message: 'No active users found' });
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching most active users:', error.message, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get trending genres
const getTrendingGenres = async (req, res) => {
    try {
      const genres = await Movie.aggregate([
        { $unwind: '$genre' },
        { $group: { _id: '$genre', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]);
  
      if (!genres.length) return res.status(404).json({ message: 'No trending genres found' });
  
      res.status(200).json(genres);
    } catch (error) {
      console.error('Error fetching trending genres:', error.message, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get most searched actors
const getMostSearchedActors = async (req, res) => {
    try {
      const actors = await Person.find({ role: 'Actor' })
        .sort({ searchCount: -1 })
        .limit(10)
        .select('name searchCount');
  
      if (!actors.length) return res.status(404).json({ message: 'No searched actors found' });
  
      res.status(200).json(actors);
    } catch (error) {
      console.error('Error fetching most searched actors:', error.message, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get user engagement
const getUserEngagement = async (req, res) => {
    try {
      const engagement = await User.aggregate([
        {
          $project: {
            name: 1,
            engagementScore: {
              $add: [
                { $size: { $ifNull: ['$likes', []] } },
                { $size: { $ifNull: ['$comments', []] } },
                { $size: { $ifNull: ['$reviews', []] } },
              ],
            },
          },
        },
        { $sort: { engagementScore: -1 } },
      ]);
  
      if (!engagement.length) return res.status(404).json({ message: 'No user engagement data found' });
  
      res.status(200).json(engagement);
    } catch (error) {
      console.error('Error fetching user engagement data:', error.message, error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getAllReviews,
  deleteReview,
  getPopularMovies,
  getMostActiveUsers,
  getTrendingGenres,
  getMostSearchedActors,
  getUserEngagement,
};

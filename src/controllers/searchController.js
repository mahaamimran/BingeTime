const Movie = require('../models/Movie');

// Search and filter movies
const searchMovies = async (req, res) => {
  try {
    const {
      title,
      genre,
      director,
      actor,
      minRating,
      maxRating,
      minYear,
      maxYear,
      decade,
      countryOfOrigin,
      language,
      keyword,
    } = req.query;

    const query = {};

    // Search by title (partial match)
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    // Filter by genre
    if (genre) {
      query.genre = { $in: genre.split(',') };
    }

    // Filter by director
    if (director) {
      query.director = director;
    }

    // Filter by actors
    if (actor) {
      query.cast = { $in: actor.split(',') };
    }

    // Filter by rating range
    if (minRating || maxRating) {
      query.averageRating = {};
      if (minRating) query.averageRating.$gte = Number(minRating);
      if (maxRating) query.averageRating.$lte = Number(maxRating);
    }

    // Filter by release year range
    if (minYear || maxYear) {
      query.releaseDate = {};
      if (minYear) query.releaseDate.$gte = new Date(`${minYear}-01-01`);
      if (maxYear) query.releaseDate.$lte = new Date(`${maxYear}-12-31`);
    }

    // Filter by release decade
    if (decade) {
      const startYear = parseInt(decade, 10);
      const endYear = startYear + 9;
      query.releaseDate = {
        $gte: new Date(`${startYear}-01-01`),
        $lte: new Date(`${endYear}-12-31`),
      };
    }

    // Filter by country of origin
    if (countryOfOrigin) {
      query.countryOfOrigin = { $regex: countryOfOrigin, $options: 'i' };
    }

    // Filter by language
    if (language) {
      query.language = { $regex: language, $options: 'i' };
    }

    // Filter by keyword in synopsis or trivia
    if (keyword) {
      query.$or = [
        { synopsis: { $regex: keyword, $options: 'i' } },
        { trivia: { $regex: keyword, $options: 'i' } },
      ];
    }

    // Execute query and sort by popularity (ratingsCount)
    const movies = await Movie.find(query).sort({ ratingsCount: -1 });

    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get top movies of the month
const getTopMoviesOfMonth = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const endOfMonth = new Date();
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);

    const topMovies = await Movie.find({
      releaseDate: { $gte: startOfMonth, $lte: endOfMonth },
    })
      .sort({ averageRating: -1 })
      .limit(10);

    res.status(200).json(topMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get top movies by genre
const getTopMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.query;

    if (!genre) {
      return res.status(400).json({ message: 'Genre is required' });
    }

    const topMovies = await Movie.find({ genre: { $in: [genre] } })
      .sort({ averageRating: -1 })
      .limit(10);

    res.status(200).json(topMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  searchMovies,
  getTopMoviesOfMonth,
  getTopMoviesByGenre,
};

// src/controllers/movieController.js
const Movie = require('../models/Movie');
const Person = require('../models/Person');

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

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate('director', 'name')
      .populate('cast', 'name')
      .populate('crew', 'name');
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('director')
      .populate('cast')
      .populate('crew');

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

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};

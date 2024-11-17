// src/controllers/boxOfficeController.js
const BoxOffice = require('../models/BoxOffice');
const Award = require('../models/Award');

// Get box office details for a movie
const getBoxOfficeDetails = async (req, res) => {
  const { movieId } = req.params;

  try {
    const boxOffice = await BoxOffice.findOne({ movieId }).populate('movieId', 'title');
    if (!boxOffice) {
      return res.status(404).json({ error: 'Box office details not found for this movie.' });
    }
    res.status(200).json(boxOffice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch box office details.' });
  }
};

// Add box office details for a movie
const addBoxOfficeDetails = async (req, res) => {
  const { movieId, openingWeekendEarnings, totalEarnings, internationalRevenue } = req.body;

  try {
    const boxOffice = new BoxOffice({
      movieId,
      openingWeekendEarnings,
      totalEarnings,
      internationalRevenue,
    });

    await boxOffice.save();
    res.status(201).json(boxOffice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add box office details.' });
  }
};

// Get awards for a movie or person
const getAwards = async (req, res) => {
  const { movieId, personId } = req.query;

  try {
    const query = {};
    if (movieId) query.movieId = movieId;
    if (personId) query.personId = personId;

    const awards = await Award.find(query).populate('movieId personId', 'title name');
    res.status(200).json(awards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch awards.' });
  }
};

// Add an award
const addAward = async (req, res) => {
  const { title, year, type, category, movieId, personId } = req.body;

  try {
    const award = new Award({
      title,
      year,
      type,
      category,
      movieId,
      personId,
    });

    await award.save();
    res.status(201).json(award);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add award.' });
  }
};

module.exports = {
  getBoxOfficeDetails,
  addBoxOfficeDetails,
  getAwards,
  addAward,
};

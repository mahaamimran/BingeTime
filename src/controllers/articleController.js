// src/controllers/articleController.js
const Article = require('../models/Article');

// Get all articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('movieId', 'title genre releaseDate') // Populate movie details
      .populate('personId', 'name role'); // Populate person details
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles.' });
  }
};

// Create a new article
const createArticle = async (req, res) => {
  const { title, content, movieId, personId, author, tags } = req.body;

  try {
    const article = new Article({
      title,
      content,
      movieId,
      personId,
      author,
      tags,
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the article.' });
  }
};

// Get a specific article by ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('movieId', 'title genre releaseDate')
      .populate('personId', 'name role');
    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the article.' });
  }
};

// Delete an article
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    res.status(200).json({ message: 'Article deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the article.' });
  }
};

module.exports = {
  getArticles,
  createArticle,
  getArticleById,
  deleteArticle,
};

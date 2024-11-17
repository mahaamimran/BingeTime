// src/routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', articleController.getArticles);
router.post('/', protect, articleController.createArticle);
router.get('/:id', articleController.getArticleById);
router.delete('/:id', protect, articleController.deleteArticle);

module.exports = router;

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

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Manage articles related to movies and people
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Retrieve all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of articles retrieved successfully
 *       500:
 *         description: Failed to fetch articles
 *
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               movieId:
 *                 type: string
 *                 description: ID of the movie related to the article
 *               personId:
 *                 type: string
 *                 description: ID of the person related to the article
 *               author:
 *                 type: string
 *                 description: Author of the article
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags for categorizing the article
 *     responses:
 *       201:
 *         description: Article created successfully
 *       500:
 *         description: Failed to create the article
 */

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Retrieve a specific article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the article to retrieve
 *     responses:
 *       200:
 *         description: Article retrieved successfully
 *       404:
 *         description: Article not found
 *       500:
 *         description: Failed to fetch the article
 *
 *   delete:
 *     summary: Delete a specific article by ID
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the article to delete
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 *       500:
 *         description: Failed to delete the article
 */

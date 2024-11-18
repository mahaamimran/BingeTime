// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Login Signup routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// User Management routes
router.get('/all', protect, userController.getAllUsers);
router.get('/profile', protect, userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile);
router.delete('/:id',protect, userController.deleteUser);

// Preferences routes
router.get('/preferences', protect, userController.getPreferences);
router.post('/preferences/favoriteGenres', protect, userController.addFavoriteGenre);
router.delete('/preferences/favoriteGenres', protect, userController.removeFavoriteGenre);
router.post('/preferences/favoriteActors', protect, userController.addFavoriteActor);
router.delete('/preferences/favoriteActors', protect, userController.removeFavoriteActor);

// Custom Lists routes
router.get('/customLists', protect, userController.getCustomLists);
router.post('/customLists', protect, userController.createCustomList);
router.put('/customLists/:listId', protect, userController.updateCustomList);
router.delete('/customLists/:listId', protect, userController.deleteCustomList);
router.post('/customLists/:listId/share', protect, userController.shareCustomList);

// Followed Lists routes
router.get('/followedLists', protect, userController.getFollowedLists);
router.post('/followedLists/:listId', protect, userController.followCustomList);
router.delete('/followedLists/:listId', protect, userController.unfollowCustomList);

// Wishlist routes
router.post('/wishlist', protect, userController.addToWishlist);
router.delete('/wishlist/:movieId', protect, userController.removeFromWishlist);
router.get('/wishlist', protect, userController.getWishlist);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile operations
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */


/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires JWT authentication
 *     responses:
 *       200:
 *         description: List of all users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique ID of the user
 *                   name:
 *                     type: string
 *                     description: Name of the user
 *                   email:
 *                     type: string
 *                     description: Email of the user
 *                   role:
 *                     type: string
 *                     description: Role of the user (e.g., user, admin)
 *       401:
 *         description: Unauthorized - User must be logged in
 *       403:
 *         description: Forbidden - User does not have permission to access this route
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/preferences:
 *   get:
 *     summary: Get user preferences
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences retrieved
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/preferences/favoriteGenres:
 *   post:
 *     summary: Add a favorite genre
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite genre added
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Remove a favorite genre
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite genre removed
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/preferences/favoriteActors:
 *   post:
 *     summary: Add a favorite actor
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               actor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite actor added
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Remove a favorite actor
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               actor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite actor removed
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/customLists:
 *   get:
 *     summary: Get all custom lists
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of custom lists retrieved
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new custom list
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               movies:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Custom list created
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/customLists/{listId}:
 *   put:
 *     summary: Update a custom list
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               movies:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Custom list updated
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a custom list
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Custom list deleted
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/customLists/{listId}/share:
 *   post:
 *     summary: Share a custom list with another user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sharedWithUserId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Custom list shared
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/followedLists:
 *   get:
 *     summary: Get all followed lists
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Followed lists retrieved
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/followedLists/{listId}:
 *   post:
 *     summary: Follow a custom list
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Custom list followed
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Unfollow a custom list
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Custom list unfollowed
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/wishlist:
 *   get:
 *     summary: Get user's wishlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist retrieved
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Add a movie to the wishlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie added to wishlist
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/wishlist/{movieId}:
 *   delete:
 *     summary: Remove a movie from the wishlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie removed from wishlist
 *       500:
 *         description: Server error
 */


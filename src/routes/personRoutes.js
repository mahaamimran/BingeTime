// src/routes/personRoutes.js
const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

// Routes for managing persons (Director, Actor, Crew)
router.post('/', protect, admin, personController.addPerson); 
router.get('/', protect, admin, personController.getAllPersons); 
router.get('/:id', protect, admin, personController.getPersonById); 
router.put('/:id', protect, admin, personController.updatePerson); 
router.delete('/:id', protect, admin, personController.deletePerson); 

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Persons
 *   description: API for managing persons (Directors, Actors, Crew)
 */

/**
 * @swagger
 * /api/persons:
 *   post:
 *     summary: Add a new person
 *     tags: [Persons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the person
 *               role:
 *                 type: string
 *                 enum: [Director, Actor, Crew]
 *                 description: Role of the person
 *               biography:
 *                 type: string
 *                 description: Biography of the person
 *               awards:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of awards the person has won
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of photos of the person
 *     responses:
 *       201:
 *         description: Person created successfully
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all persons
 *     tags: [Persons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all persons
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/persons/{id}:
 *   get:
 *     summary: Get a person by ID
 *     tags: [Persons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the person
 *     responses:
 *       200:
 *         description: Person details
 *       404:
 *         description: Person not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a person by ID
 *     tags: [Persons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the person
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the person
 *               role:
 *                 type: string
 *                 enum: [Director, Actor, Crew]
 *                 description: Role of the person
 *               biography:
 *                 type: string
 *                 description: Biography of the person
 *               awards:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of awards
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of photos
 *     responses:
 *       200:
 *         description: Person updated successfully
 *       404:
 *         description: Person not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a person by ID
 *     tags: [Persons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the person
 *     responses:
 *       200:
 *         description: Person deleted successfully
 *       404:
 *         description: Person not found
 *       500:
 *         description: Server error
 */


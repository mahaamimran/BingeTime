// src/routes/personRoutes.js
const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

// Routes for managing persons (Director, Actor, Crew)
router.post('/', protect, admin, personController.addPerson); // Add a new person
router.get('/', protect, admin, personController.getAllPersons); // Get all persons
router.get('/:id', protect, admin, personController.getPersonById); // Get a person by ID
router.put('/:id', protect, admin, personController.updatePerson); // Update a person
router.delete('/:id', protect, admin, personController.deletePerson); // Delete a person

module.exports = router;

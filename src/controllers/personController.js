// src/controllers/personController.js
const Person = require('../models/Person');

// Add a new person
const addPerson = async (req, res) => {
  try {
    const { name, role, biography, awards, photos } = req.body;

    const person = await Person.create({ name, role, biography, awards, photos });
    res.status(201).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all persons
const getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a person by ID
const getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id).populate('filmography');
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.status(200).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a person by ID
const updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.status(200).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a person by ID
const deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addPerson,
  getAllPersons,
  getPersonById,
  updatePerson,
  deletePerson,
};

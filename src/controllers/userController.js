// src/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// this is to generate jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// registering a new user

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = await User.create({ name, email, password, role: role || 'user' });

        const token = generateToken(user._id);
        res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login an existing user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // finf based on email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Username' });

        // check password using model method
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

        // token
        const token = generateToken(user._id);

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// delete a user
const deleteUser = async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Allow delete only if the user is the account owner or an admin
        if (req.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        // Directly delete by ID
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// get the authenticated user's profile
const getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
};

// update the authenticated user's profile
const updateUserProfile = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        // Update the user's profile
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email, role },
            { new: true, runValidators: true }
        );

        res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// add to wishlist
const addToWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // check if movie already in wishlist
        if (user.wishlist.includes(req.body.movieId)) {
            return res.status(400).json({ message: 'Movie already in wishlist' });
        }

        user.wishlist.push(req.body.movieId);
        await user.save();
        res.status(200).json({ message: 'Movie added to wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove a movie from the user's wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.wishlist = user.wishlist.filter(
            (movieId) => movieId.toString() !== req.params.movieId
        );
        await user.save();
        res.status(200).json({ message: 'Movie removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all movies in the user's wishlist
const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.status(200).json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
};


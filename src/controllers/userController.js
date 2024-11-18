// src/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// this is to generate jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};
// ---------------------------- Login Signup ----------------------------
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

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
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

// ---------------------------- User Management ----------------------------
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

// ---------------------------- Preferences ----------------------------

// Get user preferences
const getPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('preferences');
        res.status(200).json(user.preferences);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a favorite genre
const addFavoriteGenre = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { genre } = req.body;

        if (!user.preferences.favoriteGenres.includes(genre)) {
            user.preferences.favoriteGenres.push(genre);
            await user.save();
            res.status(200).json({ message: 'Favorite genre added' });
        } else {
            res.status(400).json({ message: 'Genre already in favorites' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove a favorite genre
const removeFavoriteGenre = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { genre } = req.body;

        user.preferences.favoriteGenres = user.preferences.favoriteGenres.filter(g => g !== genre);
        await user.save();
        res.status(200).json({ message: 'Favorite genre removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a favorite actor
const addFavoriteActor = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { actor } = req.body;

        if (!user.preferences.favoriteActors.includes(actor)) {
            user.preferences.favoriteActors.push(actor);
            await user.save();
            res.status(200).json({ message: 'Favorite actor added' });
        } else {
            res.status(400).json({ message: 'Actor already in favorites' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove a favorite actor
const removeFavoriteActor = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { actor } = req.body;

        user.preferences.favoriteActors = user.preferences.favoriteActors.filter(a => a !== actor);
        await user.save();
        res.status(200).json({ message: 'Favorite actor removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// ---------------------------- Custom Lists ----------------------------
// Get all custom lists
const getCustomLists = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('customLists');
        res.status(200).json(user.customLists);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new custom list
const createCustomList = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { title, movies } = req.body;

        // Add the custom list
        user.customLists.push({
            title,
            movies,
            creator: req.user._id,
        });

        await user.save();
        res.status(201).json({ message: 'Custom list created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing custom list
const updateCustomList = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { title, movies } = req.body;
        const { listId } = req.params;

        const customList = user.customLists.id(listId);
        if (!customList) return res.status(404).json({ message: 'Custom list not found' });

        customList.title = title || customList.title;
        customList.movies = movies || customList.movies;

        await user.save();
        res.status(200).json({ message: 'Custom list updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a custom list
const deleteCustomList = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { listId } = req.params;

        user.customLists = user.customLists.filter(list => list._id.toString() !== listId);
        await user.save();
        res.status(200).json({ message: 'Custom list deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Share a custom list with other users
const shareCustomList = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { listId } = req.params;
        const { sharedWithUserId } = req.body;

        const customList = user.customLists.id(listId);
        if (!customList) return res.status(404).json({ message: 'Custom list not found' });

        if (!customList.sharedWith.includes(sharedWithUserId)) {
            customList.sharedWith.push(sharedWithUserId);
            await user.save();
            res.status(200).json({ message: 'Custom list shared' });
        } else {
            res.status(400).json({ message: 'User already has access to this list' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// ------------------------- Followed List -------------------------

// Get all followed lists for the authenticated user
const getFollowedLists = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('followedLists');
        res.status(200).json(user.followedLists);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Follow a custom list
const followCustomList = async (req, res) => {
    try {
        const { listId } = req.params;
        const user = await User.findById(req.user._id);

        // Check if the list is already followed
        if (user.followedLists.some(list => list.listId.toString() === listId)) {
            return res.status(400).json({ message: 'You are already following this list' });
        }

        // Fetch the custom list from the creator
        const creator = await User.findOne({ 'customLists._id': listId });
        if (!creator) return res.status(404).json({ message: 'Custom list not found' });

        const customList = creator.customLists.id(listId);

        // Check if the list is shared with the user or created by the user
        if (
            customList.creator.toString() !== req.user._id.toString() &&
            !customList.sharedWith.some(id => id.toString() === req.user._id.toString())
        ) {
            return res.status(403).json({ message: 'You do not have access to this list' });
        }

        user.followedLists.push({
            userId: creator._id,
            listId: customList._id,
            title: customList.title,
            movies: customList.movies,
            creator: customList.creator,
        });

        await user.save();
        res.status(200).json({ message: 'Custom list followed', followedLists: user.followedLists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Unfollow a custom list
const unfollowCustomList = async (req, res) => {
    try {
        const { listId } = req.params;
        const user = await User.findById(req.user._id);

        user.followedLists = user.followedLists.filter(list => list.listId.toString() !== listId);

        await user.save();
        res.status(200).json({ message: 'Custom list unfollowed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// ---------------------------- Wishlist ----------------------------

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
    getUsers,
    deleteUser,
    getUserProfile,
    updateUserProfile,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    getPreferences,
    addFavoriteGenre,
    removeFavoriteGenre,
    addFavoriteActor,
    removeFavoriteActor,
    getCustomLists,
    createCustomList,
    updateCustomList,
    deleteCustomList,
    shareCustomList,
    getFollowedLists,
    followCustomList,
    unfollowCustomList,
};

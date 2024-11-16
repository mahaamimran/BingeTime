// src/middlewares/checkListShared.js
const User = require('../models/User');

const checkListSharedWithUser = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const userId = req.user._id;

    // Find the user with the specified custom list
    const user = await User.findOne({ "customLists._id": listId });
    
    if (!user) {
      return res.status(404).json({ message: "Custom list not found" });
    }

    // Find the specific list from user's custom lists
    const customList = user.customLists.id(listId);

    // Check if the user is in the sharedWith array or is the creator
    if (
      customList.creator.toString() === userId.toString() || 
      customList.sharedWith.some(id => id.toString() === userId.toString())
    ) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. This list is not shared with you." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkListSharedWithUser;

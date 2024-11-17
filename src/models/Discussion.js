const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            content: { type: String, required: true },
            likes: { type: Number, default: 0 },
            likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            createdAt: { type: Date, default: Date.now }
        }
    ],
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track users who liked
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Discussion', DiscussionSchema);

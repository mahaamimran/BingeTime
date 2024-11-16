const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
        },
        preferences: {
            favoriteGenres: [String],
            favoriteActors: [String],
        },
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie',
            },
        ],
        // Embedded custom lists created by the user
        customLists: [
            {
                title: {
                    type: String,
                    required: true,
                },
                movies: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Movie',
                    },
                ],
                sharedWith: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                    },
                ],
                creator: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        // Lists followed by the user
        followedLists: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                listId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                title: {
                    type: String,
                },
                movies: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Movie',
                    },
                ],
                creator: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password comparison method
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

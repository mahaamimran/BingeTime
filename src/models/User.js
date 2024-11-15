// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true, // leaves out leading + trailing spaces
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
    customLists: [
      {
        title: String,
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hashing before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// password compare
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

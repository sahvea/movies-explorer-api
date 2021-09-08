const mongoose = require('mongoose');
const validator = require('validator');
const messages = require('../utils/messages');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => {
        validator.isURL(link, { protocols: ['http', 'https'], require_protocol: true });
      },
      message: messages.incorrectURL,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (link) => {
        validator.isURL(link, { protocols: ['http', 'https'], require_protocol: true });
      },
      message: messages.incorrectURL,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => {
        validator.isURL(link, { protocols: ['http', 'https'], require_protocol: true });
      },
      message: messages.incorrectURL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    select: false,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

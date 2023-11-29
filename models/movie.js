const mongoose = require('mongoose');
const { linkRx } = require('../validations/constants');

const schema = new mongoose.Schema({
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
      validator: (val) => linkRx.test(val),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (val) => linkRx.test(val),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (val) => linkRx.test(val),
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

module.exports = mongoose.model('movie', schema);

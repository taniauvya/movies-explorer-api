const { celebrate, Joi } = require('celebrate');
const { MONGO_ID_LENGTH, linkRx } = require('./constants');

module.exports.signup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string(),
  }).options({ presence: 'required' }),
});

module.exports.signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
  }).options({ presence: 'required' }),
});

module.exports.updateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

module.exports.deleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(MONGO_ID_LENGTH),
  }),
});

module.exports.createMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number().integer(),
    year: Joi.string(),
    description: Joi.string(),
    image: Joi.string().required().pattern(linkRx),
    trailerLink: Joi.string().required().pattern(linkRx),
    thumbnail: Joi.string().required().pattern(linkRx),
    movieId: Joi.number(),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
  }).options({ presence: 'required' }),
});

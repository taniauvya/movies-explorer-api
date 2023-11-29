const Movie = require('../models/movie');
const UnathorizedError = require('../errors/UnathorizedError');

const { handleCreateErr, handleGetSingleErr } = require('../errors/handlers');

const notFoundMessage = 'Фильм с данным ID не найден';

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        throw new UnathorizedError('Нельзя удалить чужой фильм');
      }

      return movie;
    })
    .then((movie) => movie.deleteOne().then(() => res.send(movie)))
    .catch((err) => handleGetSingleErr(next, err, notFoundMessage));
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.send(movie))
    .catch((err) => handleCreateErr(next, err));
};

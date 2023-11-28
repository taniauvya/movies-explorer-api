const router = require('express').Router();
const {
  getMovies, deleteMovie, createMovie,
} = require('../controllers/movies');
const { deleteMovie: deleteMovieSchema, createMovie: createMovieSchema } = require('../validations/joiSchemas');

router.get('/', getMovies);
router.delete('/:movieId', deleteMovieSchema, deleteMovie);
router.post('/', createMovieSchema, createMovie);

module.exports = router;

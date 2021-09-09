const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieBody, validateMovieId } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validateMovieBody, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;

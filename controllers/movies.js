const Movie = require('../models/movie');
const IncorrectDataError = require('../errors/incorrect-data-err'); // 400
const ForbiddenError = require('../errors/forbidden-err'); // 403
const NotFoundError = require('../errors/not-found-err'); // 404
const { messages, CAST_ERR, VALIDATION_ERR } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERR) {
        throw new IncorrectDataError(messages.incorrectMovieDataCreate);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messages.incorrectMovieId);
      }
      if (movie.owner.toString() !== userId) {
        next(new ForbiddenError(messages.movieDeletionError));
        return;
      }
      movie.deleteOne();
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === CAST_ERR) {
        throw new IncorrectDataError(messages.incorrectMovieId);
      } else {
        next(err);
      }
    })
    .catch(next);
};

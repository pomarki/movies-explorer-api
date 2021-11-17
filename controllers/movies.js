const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  REQUEST_ERROR, DATA_CREATE_ERROR, DATE_NOT_FOUND, DATE_SUCCESS_REMOVE, ACCESS_ERROR,
} = require('../helpers/res-messages');

module.exports.getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((moviesDate) => {
      if (!moviesDate) {
        throw new BadRequestError(REQUEST_ERROR);
      }
      res.send({ moviesDate });
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year, description, image, trailer,
    thumbnail, movieId, nameRU, nameEN,
  } = req.body;

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
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError(DATA_CREATE_ERROR);
      }
      res.send({ movie });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params.movieId })
    .orFail(new NotFoundError(DATE_NOT_FOUND))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne({ _id: movie._id })
          .then(res.send({ message: DATE_SUCCESS_REMOVE }));
      } else { throw new ForbiddenError(ACCESS_ERROR); }
    })
    .catch(next);
};

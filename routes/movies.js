const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regex = require('../helpers/URL-validate');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regex),
    trailer: Joi.string().pattern(regex),
    thumbnail: Joi.string().pattern(regex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().hex(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;

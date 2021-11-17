const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const { LINK_FORMAT_ERROR } = require('../helpers/res-messages');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const customValidationURL = (url, helpers) => {
  if (isURL(url)) {
    return url;
  }
  return helpers.message(LINK_FORMAT_ERROR);
};

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(customValidationURL),
    trailer: Joi.string().custom(customValidationURL),
    thumbnail: Joi.string().custom(customValidationURL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().hex(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex(),
  }),
}), deleteMovie);

module.exports = router;

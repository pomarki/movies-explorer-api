const { celebrate, Joi } = require('celebrate');
const customValidationURL = require('../helpers/URL-validate');

const validationsLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationsCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2),
  }),
});

const validationsUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(customValidationURL),
    trailer: Joi.string().required().custom(customValidationURL),
    thumbnail: Joi.string().required().custom(customValidationURL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex(),
  }),
});

module.exports = {
  validationsLogin,
  validationsCreateUser,
  validationCreateMovie,
  validationDeleteMovie,
  validationsUpdateUser,
};

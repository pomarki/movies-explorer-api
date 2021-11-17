const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/not-found-err');
const { ROUTE_ERROR } = require('../helpers/res-messages');

router.post('/sign-in', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/sign-up', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required(),
  }),
}), createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', (req, res, next) => next(new NotFoundError(ROUTE_ERROR)));

module.exports = router;

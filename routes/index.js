const router = require('express').Router();

const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');
const { ROUTE_ERROR } = require('../helpers/res-messages');
const { validationsLogin, validationsCreateUser } = require('../middlewares/validations');

router.post('/sign-in', validationsLogin, login);
router.post('/sign-up', validationsCreateUser, createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.all('*', (req, res, next) => next(new NotFoundError(ROUTE_ERROR)));

module.exports = router;

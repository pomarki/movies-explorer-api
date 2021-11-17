require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');

const { DATA_PATH } = process.env;
const { ROUTE_ERROR, SERVER_ERROR } = require('./helpers/res-messages');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const options = {
  origin: [
    'http://localhost:3000',
    'https://github.com/pomarki',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();

app.use('*', cors(options));

app.use(helmet());

app.use(express.json());

app.use(requestLogger);

app.post('/sign-in', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/sign-up', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required(),
  }),
}), createUser);

mongoose.connect(DATA_PATH, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(auth);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => next(new NotFoundError(ROUTE_ERROR)));

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERROR
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

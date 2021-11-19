require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorhandler');

const { PROD_DATA_PATH, NODE_ENV } = process.env;
const DEV_DATA_PATH = require('./configs/configs');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const options = {
  origin: [
    'http://localhost:3000',
    'https://github.com/pomarki',
    'https://kino-domino.nomoredomains.rocks',
    'http://kino-domino.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();

app.use('*', cors(options));

app.use(requestLogger);

app.use(helmet());

app.use(express.json());

app.use(router);

mongoose.connect(NODE_ENV === 'production' ? PROD_DATA_PATH : DEV_DATA_PATH, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

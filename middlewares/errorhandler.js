const SERVER_ERROR = require('../helpers/res-messages');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERROR
        : err.message,
    });
  next();
};

module.exports = errorHandler;

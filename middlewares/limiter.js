const rateLimit = require('express-rate-limit');
const { RATE_LIMIT_ERROR } = require('../helpers/res-messages');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: RATE_LIMIT_ERROR,
});

module.exports = limiter;

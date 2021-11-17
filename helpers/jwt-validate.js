const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

const jwtValidate = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret');

module.exports = jwtValidate;

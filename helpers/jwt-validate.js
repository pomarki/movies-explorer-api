const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const { DEV_JWT_SECRET } = require('../configs/configs');

const jwtValidate = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);

module.exports = jwtValidate;

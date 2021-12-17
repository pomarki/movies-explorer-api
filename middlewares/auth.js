const jwtValidate = require('../helpers/jwt-validate');
const UnauthorizedError = require('../errors/unauthorized-err');
const { AUTHORIZATION_ERROR } = require('../helpers/res-messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(AUTHORIZATION_ERROR);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwtValidate(token);
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_ERROR));
  }
  req.user = payload;
  next();
};

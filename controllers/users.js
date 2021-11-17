const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const { USER_NOT_FOUND, USER_REGISTRATION_ERROR, USER_AUTHENTICATION_ERROR} = require('../helpers/res-messages');

module.exports.getActualUserInfo = (req, res, next) => {
  User.findById(req.user._id)

    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send({
      name: user.name, email: user.email,
    }))
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send({
      name: user.name, email: user.email,
    }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new ConflictError(USER_REGISTRATION_ERROR);
      }
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        }))
        .then((newUser) => res
          .status(201)
          .send({ _id: newUser._id, name: newUser.name, email: newUser.email }))
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let userId;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(USER_AUTHENTICATION_ERROR));
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError(USER_AUTHENTICATION_ERROR));
      }
      const token = jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: '7d' });

      return res.send({ token });
    })

    .catch(next);
};

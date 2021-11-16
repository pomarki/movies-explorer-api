const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getActualUserInfo, updateUserProfile } = require('../controllers/users');

router.get('/me', getActualUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserProfile);

module.exports = router;

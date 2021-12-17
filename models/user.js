const mongoose = require('mongoose');

const isEmail = require('validator/lib/isEmail');
const { EMAIL_FORMAT_ERROR } = require('../helpers/res-messages');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    email: {
      type: String,
      minLength: 2,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: EMAIL_FORMAT_ERROR,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);

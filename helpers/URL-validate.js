const isURL = require('validator/lib/isURL');
const LINK_FORMAT_ERROR = require('./res-messages');

const customValidationURL = (url, helpers) => {
  if (isURL(url)) {
    return url;
  }
  return helpers.message(LINK_FORMAT_ERROR);
};

module.exports = customValidationURL;

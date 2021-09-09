const { celebrate, Joi } = require('celebrate');

const minLength = 2;
const maxLength = 30;
const minPasswordLength = 6;
const idLength = 24;
// eslint-disable-next-line no-useless-escape
const urlPattern = /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([\/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/;

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(minPasswordLength),
    name: Joi.string().min(minLength).max(maxLength),
  }),
});

const validateUserEntranceData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(minPasswordLength),
  }),
});

const validateUserUpdateData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(minLength).max(maxLength),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlPattern),
    trailer: Joi.string().required().pattern(urlPattern),
    thumbnail: Joi.string().required().pattern(urlPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(idLength),
  }),
});

module.exports = {
  validateUserBody,
  validateUserEntranceData,
  validateUserUpdateData,
  validateMovieBody,
  validateMovieId,
};

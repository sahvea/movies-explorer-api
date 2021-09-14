const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');
const { messages } = require('../utils/constants');

const MIN_LENGTH = 2;
const MAX_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 6;
const ID_LENGTH = 24;

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(MIN_PASSWORD_LENGTH),
    name: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH),
  }),
});

const validateUserEntranceData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(MIN_PASSWORD_LENGTH),
  }),
});

const validateUserUpdateData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(MIN_LENGTH).max(MAX_LENGTH),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError(messages.incorrectURL);
      }
      return value;
    }),
    trailer: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError(messages.incorrectURL);
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError(messages.incorrectURL);
      }
      return value;
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(ID_LENGTH),
  }),
});

module.exports = {
  validateUserBody,
  validateUserEntranceData,
  validateUserUpdateData,
  validateMovieBody,
  validateMovieId,
};

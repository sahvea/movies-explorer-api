const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {
  IncorrectDataError,
  NotFoundError,
  EmailConflictError,
} = require('../errors/classes');
const messages = require('../utils/messages');
const {
  CAST_ERR,
  VALIDATION_ERR,
  MONGO_ERR,
  MONGO_ERR_CODE,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === VALIDATION_ERR) {
        throw new IncorrectDataError(messages.incorrectProfileDataCreate);
      } else if (err.name === MONGO_ERR && err.code === MONGO_ERR_CODE) {
        throw new EmailConflictError(messages.alreadyExistingEmail);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.incorrectUserId);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === CAST_ERR) {
        throw new IncorrectDataError(messages.incorrectUserId);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.incorrectUserId);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERR) {
        throw new IncorrectDataError(messages.incorrectProfileDataUpdate);
      } else if (err.name === CAST_ERR) {
        throw new IncorrectDataError(messages.incorrectUserId);
      } else {
        next(err);
      }
    })
    .catch(next);
};

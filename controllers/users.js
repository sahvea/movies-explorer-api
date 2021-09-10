const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const IncorrectDataError = require('../errors/incorrect-data-err'); // 400
const AuthorizationError = require('../errors/authorization-err'); // 401
const NotFoundError = require('../errors/not-found-err'); // 404
const EmailConflictError = require('../errors/email-conflict-err'); // 409
const {
  messages,
  codeStatuses,
  CAST_ERR,
  VALIDATION_ERR,
  MONGO_ERR,
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
      } else if (err.name === MONGO_ERR && err.code === codeStatuses.mongoErr) {
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
      } else if (err.code === codeStatuses.mongoErr) {
        throw new EmailConflictError(messages.alreadyExistingEmail);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );

      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
        .send({ message: messages.successfulLogin });
    })
    .catch((err) => {
      throw new AuthorizationError(`${messages.authError}: ${err.message}`);
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt')
    .send({ message: messages.successfulLogout });

  next();
};

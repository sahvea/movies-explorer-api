const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/authorization-err'); // 401
const { messages } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    throw new AuthorizationError(messages.authRequired);
  }

  try {
    payload = jwt.verify(token, 'super-strong-secret');
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthorizationError(messages.authRequired));
  }
};

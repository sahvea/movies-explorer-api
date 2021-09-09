const { messages, codeStatuses } = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = codeStatuses.internalServerErr, message } = err;

  res.status(statusCode).send({
    message: statusCode === codeStatuses.internalServerErr
      ? messages.internalServerError
      : message,
  });
  next();
});

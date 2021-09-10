const { codeStatuses } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.notFoundErr;
  }
}

module.exports = NotFoundError;

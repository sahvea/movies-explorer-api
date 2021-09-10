const { codeStatuses } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.forbiddenErr;
  }
}

module.exports = ForbiddenError;

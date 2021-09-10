const { codeStatuses } = require('../utils/constants');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.unauthorizedErr;
  }
}

module.exports = AuthorizationError;

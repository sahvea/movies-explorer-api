const { codeStatuses } = require('../utils/constants');

class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.badRequestErr;
  }
}

module.exports = IncorrectDataError;

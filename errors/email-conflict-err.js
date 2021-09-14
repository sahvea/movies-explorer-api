const { codeStatuses } = require('../utils/constants');

class EmailConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.conflictErr;
  }
}

module.exports = EmailConflictError;

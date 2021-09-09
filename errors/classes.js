/* eslint-disable max-classes-per-file */
const { codeStatuses } = require('../utils/constants');

class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.badRequestErr;
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.unauthorizedErr;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.forbiddenErr;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.notFoundErr;
  }
}

class EmailConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatuses.conflictErr;
  }
}

module.exports = {
  IncorrectDataError,
  AuthorizationError,
  ForbiddenError,
  NotFoundError,
  EmailConflictError,
};

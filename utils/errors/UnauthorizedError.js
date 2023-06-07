const { STATUS_CODES } = require('../constants');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
};

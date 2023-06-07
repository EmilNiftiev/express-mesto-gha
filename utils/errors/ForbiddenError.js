const { STATUS_CODES } = require('../constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
};

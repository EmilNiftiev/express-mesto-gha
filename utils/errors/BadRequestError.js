const { STATUS_CODES } = require('../constants');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
};

const { STATUS_CODES } = require('../constants');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
};

const { HTTP_STATUS_CONFLICT } = require('http2').constants;

class DupError extends Error {
  constructor() {
    super('Пользователь с данным email уже зарегистрирован');
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = DupError;

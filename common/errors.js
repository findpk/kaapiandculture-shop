class BaseError extends Error {
  static get error() {
    return this.name;
  }
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.error = this.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BaseErrorWithArgs extends BaseError {
  constructor(message, args = {}) {
    super(message);
    this.args = args;
  }
}

class Unauthorized extends BaseError {
  constructor() {
    super('Unauthorized')
    this.statusCode = 401
  }
}


class UserNotFound extends BaseError {
  constructor(args = {}) {
    super('User not found')
    this.status_code = 404
  }
}

class InvalidPassword extends BaseError {
  constructor(args = {}) {
    super('Invalid password')
    this.status_code = 400
  }
}

class UserAlreadyRegistered extends BaseError {
  constructor(args = {}) {
    super('User already registered')
    this.status_code = 500
  }
}

class FailedToSendToQueue extends BaseError {
  constructor(args = {}) {
    super('Failed to send message to queue')
    this.status_code = 500
  }
}

class FailedToPublish extends BaseError {
  constructor(args = {}) {
    super('Failed to publish message to exchange')
    this.status_code = 500
  }
}

class SKUAlreadyExists extends BaseError {
  constructor(args = {}) {
    super('Product with the given SKU already exists')
    this.status_code = 409
  }
}

class SKUNotFound extends BaseError {
  constructor(args = {}) {
    super('Product Not Found')
    this.status_code = 409
  }
}

module.exports = {
  Unauthorized,
  UserNotFound,
  InvalidPassword,
  UserAlreadyRegistered,
  FailedToSendToQueue,
  FailedToPublish,
  SKUAlreadyExists,
  SKUNotFound
}
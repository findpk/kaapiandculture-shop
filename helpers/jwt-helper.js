const jwt = require('jsonwebtoken'),
  BaseHelper = require('./../base-helper');

// https://www.fullstackfoundations.com/blog/passport-jwt
// https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
class JWT extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context)
    this.secret = configs.app.jwt.secret
    this.options = {
      expiresIn: configs.app.jwt.expires_in,
      algorithm: configs.app.jwt.algorithm,
    }
  }

  sign(payload) {
    const me = this
    try {
      return jwt.sign(payload, me.secret, me.options)
    } catch (e) {
      throw e
    }
  }
}

module.exports = JWT
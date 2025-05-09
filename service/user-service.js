const uuid = require('uuid'),
  _ = require('lodash'),
  moment = require('moment'),
  BaseHelper = require('./../base-helper'),
  Errors = require('../common/errors'),
  Enum = require('../common/enum'),
  BcryptHelper = require('./../helpers/bcrypt-helper'),
  JWTHelper = require('./../helpers/jwt-helper'),
  UsersAccessor = require('../db-accessors/users-accessor');
class UserService extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context)
    this.bcryptHelper = new BcryptHelper(dependencies, configs, context)
    this.jwtHelper = new JWTHelper(dependencies, configs, context)
    this.usersAccessor = new UsersAccessor(dependencies, configs, context)
  }

  async signUp(requestBody) {
    const me = this
    try {
      try {
        await me.getUser(requestBody)
      } catch (e) {
        if (e.name === 'UserNotFound') {
          let pwd = _.get(requestBody, 'pwd')
          requestBody = _.omit(requestBody, ['pwd', 'confirm_pwd'])
          _.set(requestBody, 'pwd', await me.bcryptHelper.hashPwd(pwd))
          await me.usersAccessor.insert({
            id: uuid.v4(),
            data: requestBody
          })
          return { message: 'User created successfully!' }
        }
      }
      throw new Errors.UserAlreadyRegistered()
    } catch (e) {
      throw e
    }
  }

  async signIn(requestBody) {
    const me = this
    try {
      let userDetails = await me.getUser(requestBody)
      if (!(await me.bcryptHelper.compare(requestBody.pwd, userDetails.pwd))) {
        throw new Errors.InvalidPassword()
      }
      let token = me.jwtHelper.sign({
        email: _.get(userDetails, 'email'),
        role: _.get(userDetails, 'role')
      })
      return {
        message: 'Signed in successfully!',
        cookies: {
          jwt: token
        }
      }
    } catch (e) {
      throw e
    }
  }

  async getUser(requestBody) {
    const me = this
    try {
      let { email } = requestBody
      let userDetails = await me.usersAccessor.getByEmail(email)
      if (_.isEmpty(userDetails)) {
        throw new Errors.UserNotFound()
      }
      return _.get(_.first(userDetails), 'data', {})
    } catch (e) {
      throw e
    }
  }
}

module.exports = UserService
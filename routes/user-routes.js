const { Router } = require('express'),
  BaseHelper = require('../base-helper'),
  { validateBody, validateQuery } = require('./../middlewares/validate'),
  { authenticate, checkSignIn } = require('../middlewares/authenticate'),
  { authorize } = require('../middlewares/authorize'),
  Schema = require('./../schema/api/user-routes-schema'),
  UserRoutesHandler = require('./../handlers/user-routes-handler');

// https://www.bacancytechnology.com/blog/joi-validation-in-nodejs-and-express
class UserRoutes extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context)
    this.router = new Router()
    this.userRoutesHandler = new UserRoutesHandler(dependencies, configs, context)
  }

  registerUserRoutes() {
    const me = this
    // ToDo: Implement PassportJS here for auth strategies
    // ToDo: Implement RateLimiter
    me.router.post('/v1/users/signup',
      [
        validateBody(Schema.SignUp),
        // authenticate(me.configs.app.jwt),
      ],
      async (req, res, next) => {
        return await me.userRoutesHandler.signUp(req, res, next)
      }
    )
    me.router.post('/v1/users/signin',
      [
        validateBody(Schema.SignIn),
        checkSignIn(me.configs.app.jwt),
      ],
      async (req, res, next) => {
        return await me.userRoutesHandler.signIn(req, res, next)
      }
    )
    return me.router
  }
}

module.exports = UserRoutes
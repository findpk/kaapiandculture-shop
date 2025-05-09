const BaseHelper = require("./../base-helper"),
  UserService = require("./../service/user-service");
class UserRoutesHandler extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
    this.userService = new UserService(dependencies, configs, context);
  }

  async signUp(req, res, next) {
    const me = this;
    try {
      let result = await me.userService.signUp(req.body);
      me.replySuccess(res, result);
    } catch (e) {
      me.replyError(res, e);
    }
  }

  async signIn(req, res, next) {
    const me = this;
    try {
      let result = await me.userService.signIn(req.body);
      me.replySuccess(res, result);
    } catch (e) {
      me.replyError(res, e);
    }
  }
}

module.exports = UserRoutesHandler;

const bcrypt = require("bcrypt"),
  BaseHelper = require("./../base-helper");

class Bcrypt extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
    this.saltRounds = configs.app.hashing.salt_rounds || 10;
  }

  async hashPwd(pwd) {
    const me = this;
    try {
      return await bcrypt.hash(pwd, me.saltRounds);
    } catch (e) {
      throw e;
    }
  }

  async compare(plainTxt, hash) {
    try {
      return await bcrypt.compare(plainTxt, hash);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Bcrypt;

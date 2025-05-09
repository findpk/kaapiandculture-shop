const { customAlphabet } = require("nanoid"),
  _ = require("lodash"),
  Enum = require("./common/enum");

class BaseHelper {
  constructor(dependencies, configs, context) {
    this.dependencies = dependencies;
    this.configs = configs;
    this.context = context;
  }

  shortId(prefix = Enum.ShortIdPrefix.Default, length = 10) {
    const nanoid = customAlphabet(Enum.ShortIdCharacters, 10);
    return prefix + nanoid(length);
  }

  setCookies(response, result) {
    let cookies = _.get(result, "cookies", {});
    for (let key in cookies) {
      let value = cookies[key];
      response.cookie(key, value, {
        maxAge: 1000 * 60 * 60 * 4,
        httpOnly: true,
      });
    }
    _.unset(result, "cookies");
  }

  replySuccess(response, result) {
    const me = this;
    try {
      me.setCookies(response, result);
      return response.status(200).send(result);
    } catch (e) {
      throw e;
    }
  }

  replyError(response, error) {
    try {
      return response.status(error.status_code || 500).send({
        ...error.args,
        error: error.error || "UnexpectedError",
        message: error.message || "Unexpected error occurred",
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = BaseHelper;

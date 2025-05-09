const cors = require("cors"),
  BodyParser = require("body-parser"),
  CookieParser = require("cookie-parser"),
  BaseHelper = require("./base-helper"),
  ErrorHandler = require("./middlewares/errors");
class Middlewares extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
  }

  async registerMiddlewares() {
    const me = this;
    me.dependencies.app.use(
      cors({
        exposedHeaders: "*, set-cookie",
      }),
    );
    me.dependencies.app.use(BodyParser.json());
    me.dependencies.app.use(CookieParser());
    me.dependencies.app.use(ErrorHandler);
  }
}

module.exports = Middlewares;

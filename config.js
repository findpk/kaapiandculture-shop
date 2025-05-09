const _ = require("lodash"),
  configs = require("./config.json"),
  BaseHelper = require("./base-helper");

class Config extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
  }

  init() {
    const me = this;
    Object.assign(me.configs, configs); // Pass by reference
  }
}

module.exports = Config;

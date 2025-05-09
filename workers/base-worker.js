const _ = require("lodash"),
  moment = require("moment"),
  DB = require("./../db"),
  Amqp = require("./../amqp"),
  Config = require("./../config");

class BaseWorker {
  constructor(dependencies, configs, context) {
    this.dependencies = dependencies;
    this.configs = configs;
    this.context = context;
  }

  async start() {
    const me = this;
    try {
      await me.init();
      await me.setDependencies();
      await me.run();
    } catch (e) {
      throw e;
    }
  }

  async init() {
    const me = this;
    try {
      let config = new Config(me.dependencies, me.configs, me.context);
      config.init();
      let db = new DB(me.dependencies, me.configs, me.context);
      db.init();
      let amqp = new Amqp(me.dependencies, me.configs, me.context);
      await amqp.init();
    } catch (e) {
      throw e;
    }
  }

  async setDependencies() {
    // To be implemented by caller
  }

  async run() {
    // To be implemented by caller
  }

  checkIfDelayExists(message) {
    const me = this;
    try {
      let delayInSecs = _.get(message, "data.delay_in_secs");
      let lastModifiedDate = _.get(message, "modified_date");
      return moment(lastModifiedDate).add(delayInSecs, "seconds") < moment();
    } catch (e) {
      throw e;
    }
  }
}

module.exports = BaseWorker;

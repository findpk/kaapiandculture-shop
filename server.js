const Express = require("express");
const BaseHelper = require("./base-helper");
class Server extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
  }

  async initServer() {
    const me = this;
    try {
      // ToDo: This works as of now. Work on improvising error handling
      const app = new Express();
      app.listen(me.configs.app.port, () => { });
      me.dependencies.app = app;
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }
}

module.exports = Server;

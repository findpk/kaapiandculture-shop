const Server = require("./server"),
  Middlewares = require("./middlewares"),
  Routes = require("./routes"),
  DB = require("./db"),
  Config = require("./config");
class App {
  constructor() {
    this.dependencies = {};
    this.configs = {};
    this.context = {};
  }

  fetchConfig() {
    const me = this;
    let config = new Config(me.dependencies, me.configs, me.context);
    config.init();
  }

  initDBConnection() {
    const me = this;
    let db = new DB(me.dependencies, me.configs, me.context);
    db.init();
  }

  async initServer() {
    const me = this;
    let server = new Server(me.dependencies, me.configs, me.context);
    await server.initServer();
  }

  async registerMiddlewares() {
    const me = this;
    let middlewares = new Middlewares(me.dependencies, me.configs, me.context);
    await middlewares.registerMiddlewares();
  }

  async registerRoutes() {
    const me = this;
    let routes = new Routes(me.dependencies, me.configs, me.context);
    await routes.registerRoutes();
  }

  async start() {
    const me = this;
    try {
      me.fetchConfig();
      me.initDBConnection();
      await me.initServer();
      await me.registerMiddlewares();
      await me.registerRoutes();
      console.log("Server running successfully!!!");
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = App;

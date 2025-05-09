const pg = require("pg-promise")(),
  BaseHelper = require("./base-helper");

// https://vitaly-t.github.io/pg-promise/Database.html
// https://github.com/vitaly-t/pg-promise/wiki/learn-by-example
class DB extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
  }

  init() {
    const me = this;
    me.dependencies.db = pg({
      host: me.configs.db.host,
      port: me.configs.db.port,
      database: me.configs.db.database,
      user: me.configs.db.user,
      password: me.configs.db.password,
    });
  }
}

module.exports = DB;

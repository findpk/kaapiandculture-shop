const _ = require("lodash"),
  uuid = require("uuid"),
  BaseHelper = require("../base-helper");
class MessageHistoryAccessor extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
    this.pgp = dependencies.db;
  }

  async insert(payload) {
    const me = this;
    try {
      let id = _.get(payload, "id", uuid.v4());
      let data = _.get(payload, "data", {});
      return await me.pgp.one(
        "INSERT INTO message_history(id, data) VALUES($1, $2) RETURNING id",
        [id, data],
      );
    } catch (e) {
      throw e;
    }
  }

  async update(id, data) {
    const me = this;
    try {
      return await me.pgp.one(
        "UPDATE message_history set data = $2 where id = $1 RETURNING id",
        [id, data],
      );
    } catch (e) {
      throw e;
    }
  }

  async get(id) {
    const me = this;
    try {
      return await me.pgp.any(
        `SELECT data from message_history where id = $1`,
        [id],
      );
    } catch (e) {
      throw e;
    }
  }

  async getByStatus(status) {
    const me = this;
    try {
      return await me.pgp.any(
        `SELECT * from message_history where data->>'status' = $1`,
        [status],
      );
    } catch (e) {
      throw e;
    }
  }
}

module.exports = MessageHistoryAccessor;

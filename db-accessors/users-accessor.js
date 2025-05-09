const _ = require('lodash'),
  uuid = require('uuid'),
  BaseHelper = require('../base-helper');
class UsersAccessor extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context)
    this.pgp = dependencies.db
  }

  async insert(payload) {
    const me = this
    try {
      let id = _.get(payload, 'id', uuid.v4())
      let data = _.get(payload, 'data', {})
      return await me.pgp.one('INSERT INTO users(id, data) VALUES($1, $2) RETURNING id', [id, data])
    } catch (e) {
      throw e
    }
  }

  async update(id, data) {
    const me = this
    try {
      return await me.pgp.one('UPDATE users set data = $2 where id = $1 RETURNING id', [id, data])
    } catch (e) {
      throw e
    }
  }

  async getByEmail(email) {
    const me = this
    try {
      return await me.pgp.any(`SELECT data from users where data->>'email' = $1`, [email])
    } catch (e) {
      throw e
    }
  }
}

module.exports = UsersAccessor
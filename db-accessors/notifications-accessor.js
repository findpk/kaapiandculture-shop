const _ = require('lodash'),
  uuid = require('uuid'),
  BaseHelper = require('../base-helper');

class NotificationsAccessor extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context)
    this.pgp = dependencies.db
  }

  async insert(payload) {
    const me = this
    try {
      let id = _.get(payload, 'id', uuid.v4())
      let data = _.get(payload, 'data', {})
      return await me.pgp.one('INSERT INTO notifications(id, data) VALUES($1, $2) RETURNING id', [id, data])
    } catch (e) {
      throw e
    }
  }

  async update(id, data) {
    const me = this
    try {
      return await me.pgp.one('UPDATE notifications set data = $2 where id = $1 RETURNING id', [id, data])
    } catch (e) {
      throw e
    }
  }

  async get(id) {
    const me = this
    try {
      return await me.pgp.any(`SELECT notifications from message_history where id = $1`, [id])
    } catch (e) {
      throw e
    }
  }

  async getByStatus(status) {
    const me = this
    try {
      return await me.pgp.any(`SELECT * from notifications where data->>'status' = $1`, [status])
    } catch (e) {
      throw e
    }
  }

  async getByEventIdTypeAndDate(eventId, type, date) {
    const me = this
    try {
      return await me.pgp.any(`SELECT * from notifications where data->>'event_id' = $1 AND data->>'type' = $2 AND data->>'date' = $3`, [eventId, type, date])
    } catch (e) {
      throw e
    }
  }
}

module.exports = NotificationsAccessor
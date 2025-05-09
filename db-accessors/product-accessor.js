const _ = require('lodash'),
  uuid = require('uuid'),
  BaseHelper = require('../base-helper');

class ProductAccessor extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context)
    this.pgp = dependencies.db
  }

  async insert(payload) {
    const me = this
    try {
      let id = _.get(payload, 'id', uuid.v4())
      let data = _.get(payload, 'data', {})
      return await me.pgp.one('INSERT INTO products(id, data) VALUES($1, $2) RETURNING id', [id, data])
    } catch (e) {
      throw e
    }
  }

  async update(sku, data) {
    const me = this
    try {
      return await me.pgp.one(`UPDATE products set data = $2 where data->>'sku_id' = $1 RETURNING id`, [sku, data])
    } catch (e) {
      throw e
    }
  }

  async get(sku) {
    const me = this
    try {
      return await me.pgp.any(`SELECT data from products where data->>'sku_id' = $1`, [sku])
    } catch (e) {
      throw e
    }
  }

}

module.exports = ProductAccessor
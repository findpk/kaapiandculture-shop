const BaseHelper = require('./../base-helper'),
  ProductService = require('./../service/product-service');
class ProductRoutesHandler extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context)
    this.productService = new ProductService(dependencies, configs, context)
  }

  async addProduct(req, res, next) {
    const me = this
    try {
      let result = await me.productService.addProduct(req.body)
      me.replySuccess(res, result)
    } catch (e) {
      me.replyError(res, e)
    }
  }

  async getProduct(req, res, next) {
    const me = this
    try {
      let result = await me.productService.getProduct(req.query.sku_id)
      me.replySuccess(res, result)
    } catch (e) {
      me.replyError(res, e)
    }
  }

  async updateProduct(req, res, next) {
    const me = this
    try {
      let result = await me.productService.updateProduct(req.query.sku_id, req.body)
      me.replySuccess(res, result)
    } catch (e) {
      me.replyError(res, e)
    }
  }

}

module.exports = ProductRoutesHandler
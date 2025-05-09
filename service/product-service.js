const uuid = require('uuid'),
    _ = require('lodash'),
    moment = require('moment'),
    BaseHelper = require('./../base-helper'),
    Errors = require('../common/errors'),
    Enum = require('../common/enum'),
    ProductAccessor = require('../db-accessors/product-accessor');
class ProductService extends BaseHelper {
    constructor(dependencies, configs, context) {
        super(dependencies, configs, context)
        this.productAccessor = new ProductAccessor(dependencies, configs, context)
    }

    async addProduct(requestBody) {
        const me = this
        try {
            let product_id = uuid.v4()
            await me.productAccessor.insert({
                id: product_id,
                data: requestBody
            })
            return {
                id: product_id,
                message: 'Product created successfully!'
            }
        } catch (e) {
            if (e.message && e.message.includes("duplicate key value violates unique constraint"))
                throw new Errors.SKUAlreadyExists()
            throw e
        }
    }

    async getProduct(sku_id) {
        const me = this
        try {
            let response = await me.productAccessor.get(sku_id)
            if (_.isEmpty(response))
                throw new Errors.SKUNotFound()
            return response[0].data
        } catch (e) {
            throw e
        }
    }

    async updateProduct(sku_id, requestBody) {
        const me = this
        try {
            let productDetails = await me.getProduct(sku_id)
            let updatedDetails = _.merge(productDetails, requestBody)
            await me.productAccessor.update(sku_id, updatedDetails)
            return {
                id: sku_id,
                message: 'Product updated successfully!'
            }
        } catch (e) {
            throw e
        }
    }
}

module.exports = ProductService
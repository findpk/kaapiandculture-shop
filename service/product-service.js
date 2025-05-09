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

            // Tier Pricing
            if (requestBody.tier_pricing) {
                let providedWeights = Object.keys(requestBody.tier_pricing)
                providedWeights = providedWeights.map(i => Number(i))
                let invalidWeights = _.difference(providedWeights, productDetails.quantities)
                if (!_.isEmpty(invalidWeights))
                    throw new Errors.InvalidQuantityForTierPricing(invalidWeights, "TierPricing")
                // Replacing the existing tier_pricing with the latest one.
                updatedDetails.tier_pricing = requestBody.tier_pricing
            }

            // Inventory
            if (requestBody.available_units) {
                let providedWeights = Object.keys(requestBody.available_units)
                providedWeights = providedWeights.map(i => Number(i))
                let invalidWeights = _.difference(providedWeights, productDetails.quantities)
                if (!_.isEmpty(invalidWeights))
                    throw new Errors.InvalidQuantityForTierPricing(invalidWeights, "Inventory")
                // Replacing the existing tier_pricing with the latest one.
                updatedDetails.available_units = requestBody.available_units
            }

            await me.productAccessor.update(sku_id, updatedDetails)
            return {
                id: sku_id,
                message: 'Product updated successfully!'
            }
        } catch (e) {
            throw e
        }
    }

    async getAllProducts(query) {
        const me = this;
        try {
            // convert to number
            query.per_page = Number(query.per_page)
            query.page = Number(query.page)
            
            let limit = query.per_page, offset = (query.page - 1) * query.per_page
            let totalProducts = await me.productAccessor.getTotalProducts()
            let response = await me.productAccessor.getAllByOffsetAndLimit(limit, offset)
            let next = `/v1/product/fetchAll?page=${query.page + 1}&limit=${query.per_page}`
            if (totalProducts < (query.page + 1) * query.per_page)
                next = null
            return {
                total: totalProducts,
                products: _.map(response, 'data'),
                next: next
            };
        } catch (e) {
            throw e
        }
    }
}

module.exports = ProductService
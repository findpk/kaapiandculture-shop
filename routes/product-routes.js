const { Router } = require('express'),
    BaseHelper = require('../base-helper'),
    { validateBody, validateQuery } = require('./../middlewares/validate'),
    Schema = require('./../schema/api/product-routes-schema'),
    productRoutesHandler = require('./../handlers/product-routes-handler');

class ProductRoutes extends BaseHelper {
    constructor(dependencies, configs, context) {
        super(dependencies, configs, context)
        this.router = new Router()
        this.productRoutesHandler = new productRoutesHandler(dependencies, configs, context)
    }

    registerUserRoutes() {
        const me = this
        me.router.post('/v1/product/add',
            [
                validateBody(Schema.Product),
            ],
            async (req, res, next) => {
                return await me.productRoutesHandler.addProduct(req, res, next)
            }
        )

        me.router.get('/v1/product/fetch',
            [
                validateQuery(Schema.GetProduct),
            ],
            async (req, res, next) => {
                return await me.productRoutesHandler.getProduct(req, res, next)
            }
        )

        me.router.put('/v1/product/update',
            [
                validateQuery(Schema.GetProduct),
                validateBody(Schema.UpdateProduct)
            ],
            async (req, res, next) => {
                return await me.productRoutesHandler.updateProduct(req, res, next)
            }
        )

        me.router.get('/v1/product/fetchAll',
            [
                validateQuery(Schema.GetAllProduct)
            ],
            async (req, res, next) => {
                return await me.productRoutesHandler.getAllProducts(req, res, next)
            }
        )

        return me.router
    }
}

module.exports = ProductRoutes
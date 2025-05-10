const { Router } = require("express"),
    BaseHelper = require("../base-helper"),
    { validateBody, validateQuery, validateParams } = require("./../middlewares/validate"),
    Schema = require("./../schema/api/order-routes-schema"),
    OrderRoutesHandler = require("./../handlers/order-routes-handler");

class OrderRoutes extends BaseHelper {
    constructor(dependencies, configs, context) {
        super(dependencies, configs, context);
        this.router = new Router();
        this.orderRoutesHandler = new OrderRoutesHandler(
            dependencies,
            configs,
            context,
        );
    }

    registerOrderRoutes() {
        const me = this;
        me.router.post(
            "/v1/order/place",
            [validateBody(Schema.PlaceOrder)],
            async (req, res, next) => {
                return await me.orderRoutesHandler.placeOrder(req, res, next);
            },
        );

        me.router.get(
            "/v1/order/fetch/:order_id",
            [validateParams(Schema.GetOrder)],
            async (req, res, next) => {
                return await me.orderRoutesHandler.getOrder(req, res, next);
            },
        );

        return me.router;
    }
}

module.exports = OrderRoutes;

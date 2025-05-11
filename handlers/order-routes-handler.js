const BaseHelper = require("./../base-helper"),
    OrderService = require("./../service/order-service");
class OrderRoutesHandler extends BaseHelper {
    constructor(dependencies, configs, context) {
        super(dependencies, configs, context);
        this.orderService = new OrderService(dependencies, configs, context);
    }

    async placeOrder(req, res, next) {
        const me = this;
        try {
            let result = await me.orderService.placeOrder(req.body, req.headers.user_details);
            me.replySuccess(res, result);
        } catch (e) {
            console.log(e)
            me.replyError(res, e);
        }
    }

    async getOrder(req, res, next) {
        const me = this;
        try {
            let result = await me.orderService.getOrder(req.params.order_id);
            me.replySuccess(res, result);
        } catch (e) {
            me.replyError(res, e);
        }
    }

    async getOrders(req, res, next) {
        const me = this;
        try {
            let result = await me.orderService.getOrders(req.headers.user_details);
            me.replySuccess(res, result);
        } catch (e) {
            me.replyError(res, e);
        }
    }
}

module.exports = OrderRoutesHandler;

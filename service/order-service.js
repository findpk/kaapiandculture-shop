const uuid = require("uuid"),
    _ = require("lodash"),
    moment = require("moment"),
    BaseHelper = require("./../base-helper"),
    Errors = require("../common/errors"),
    Enum = require("../common/enum"),
    OrderAccessor = require("../db-accessors/orders-accessor"),
    ProductAccessor = require("../db-accessors/product-accessor"),
    UserAccessor = require('../db-accessors/users-accessor');
class OrderService extends BaseHelper {
    constructor(dependencies, configs, context) {
        super(dependencies, configs, context);
        this.orderAccessor = new OrderAccessor(dependencies, configs, context);
        this.productAccessor = new ProductAccessor(dependencies, configs, context);
        this.userAccessor = new UserAccessor(dependencies, configs, context);
    }

    async _validateLineItems(order) {
        const me = this;
        try {
            let lineItems = order.line_items
            if (_.isEmpty(lineItems))
                throw new Errors.EmptyCart()
            for (let item of lineItems) {
                let skuData = await me.productAccessor.get(item.sku_id)
                if (_.isEmpty(skuData))
                    throw new Errors.SKUNotFound()
                skuData = skuData[0].data
                if (!skuData.available_units[item.quantity] || skuData.available_units[item.quantity] <= 0)
                    throw new Errors.OutOfStock()
                if (skuData.tier_pricing && skuData.tier_pricing[item.quantity] && skuData.tier_pricing[item.quantity] != item.line_item_cost)
                    throw new Errors.InvalidPrice(item.sku_id, item.line_item_cost, skuData.tier_pricing[item.quantity], 'Tier Pricing')
                else if (skuData.sale_price != item.line_item_cost)
                    throw new Errors.InvalidPrice(item.sku_id, item.line_item_cost, skuData.sale_price, 'Sale Price')
            }
        } catch (e) {
            throw e;
        }
    }

    _appendUserDetails(order, userDetails){
        order.user_info = _.merge(order.user_info, {
            email: userDetails.email,
            mobile: userDetails.mobile,
            company_name: userDetails.company_name,
            tax_number: userDetails.tax_number
        })
    }

    async placeOrder(order, userDetails) {
        const me = this;
        try {
            let orderId = uuid.v4();
            await me._validateLineItems(order)
            me._appendUserDetails(order,userDetails)
            await me.orderAccessor.insert({
                id: orderId,
                data: order,
            });
            return {
                id: orderId,
                data: "Order Placed successfully!",
            };
        } catch (e) {
            throw e;
        }
    }

    async getOrder(orderId) {
        const me = this;
        try {
            let response = await me.orderAccessor.getById(orderId);
            if (_.isEmpty(response)) throw new Errors.OrderNotFound();
            return response[0].data;
        } catch (e) {
            throw e;
        }
    }

    async getOrders(userDetails){
        const me = this;
        try {
            let response = await me.orderAccessor.getByEmail(userDetails.email);
            return _.map(response,'data');
        } catch (e) {
            throw e;
        }
    }
}

module.exports = OrderService;

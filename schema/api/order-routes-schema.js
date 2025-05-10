const Joi = require("joi"),
    _ = require("lodash"),
    Enum = require("../../common/enum"),
    Constants = require("../../common/constants"),
    UUIDv4Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const PlaceOrder = Joi.object({
    line_items: Joi.array().items({
        sku_id: Joi.string().required(),
        quantity: Joi.number().required(),
        line_item_cost: Joi.number().required()
    }).required(),
    cost: Joi.object({
        total: Joi.number().required(),
        sub_total: Joi.number().required(),
        consumption_tax: Joi.number().required(),
        shipping_cost: Joi.number().required(),
        warehouse_charges: Joi.number().required(),
    }),
    // Attributes are retrived from chatgpt for a japan address
    user_info: Joi.object({
        address: Joi.object({
            postal_code: Joi.string().required(),
            prefecture: Joi.string().required(),
            city: Joi.string().required(),
            sub_area: Joi.string().required(),
            block_number: Joi.string().required(),
            building_number: Joi.string().required(),
            building_name: Joi.string().required(),
            country: Joi.string().required()
        }).required()
    })
});

const GetOrder = Joi.object({
    order_id: Joi.string().pattern(UUIDv4Regex).required()
});

module.exports = {
    PlaceOrder,
    GetOrder
};

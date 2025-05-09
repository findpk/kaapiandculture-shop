const Joi = require('joi'),
    _ = require('lodash'),
    Enum = require('../../common/enum'),
    Constants = require('../../common/constants');

const Product = Joi.object({
    sku_id: Joi.string().required(),
    lot_name: Joi.string().required(),
    process: Joi.string().required(),
    elevate: Joi.string().required(),
    region: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    images: Joi.array().allow(Joi.string()).required(),
    quantities: Joi.array().allow(Joi.number()).required(),
    sale_price: Joi.number().required(),
    tier_pricing: Joi.object().optional(),
    available_units: Joi.object().required()
})

const UpdateProduct = Joi.object({
    lot_name: Joi.string().optional(),
    process: Joi.string().optional(),
    elevate: Joi.string().optional(),
    region: Joi.string().optional(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    images: Joi.array().allow(Joi.string()).optional(),
    quantities: Joi.array().allow(Joi.number()).optional(),
    sale_price: Joi.number().required(),
    tier_pricing: Joi.object().optional(),
    available_units: Joi.object().optional()
})

const GetProduct = Joi.object({
    sku_id: Joi.string().required()
})

const GetAllProduct = Joi.object({
    page: Joi.number().required(),
    per_page: Joi.number().max(10).required()
})

module.exports = {
    Product,
    GetProduct,
    UpdateProduct,
    GetAllProduct
}
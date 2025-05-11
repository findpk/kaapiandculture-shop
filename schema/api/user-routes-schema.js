const Joi = require("joi"),
  _ = require("lodash"),
  Enum = require("../../common/enum"),
  Constants = require("../../common/constants");

const SignUp = Joi.object({
  company_name: Joi.string().required(),
  address: Joi.object({
    postal_code: Joi.number().required(),
    prefecture: Joi.string().required(),
    city: Joi.string().required(),
    sub_area: Joi.string().required(),
    block_number: Joi.string().required(),
    building_number: Joi.string().required(),
    country: Joi.string().required()
  }).required(), email: Joi.string().email().required(),
  pwd: Joi.string().pattern(new RegExp(Constants.PwdRegex)).required(),
  confirm_pwd: Joi.ref("pwd"),
  mobile: Joi.string()
    .length(10)
    .pattern(new RegExp(Constants.MobileRegex))
    .required(),
  tax_number: Joi.string().required(),
});

const SignIn = Joi.object({
  email: Joi.string().email().required(),
  pwd: Joi.string().pattern(new RegExp(Constants.PwdRegex)),
});

const VerifyJWT = Joi.object({
  jwt: Joi.string().required()
});

module.exports = {
  SignUp,
  SignIn,
  VerifyJWT
};

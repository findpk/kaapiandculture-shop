const Joi = require('joi'),
  _ = require('lodash'),
  Enum = require('./../../common/enum');

export default MessageHistory = {
  id: Joi.string().required(),
  status: Joi.string().valid(..._.keys(Enum.MessageHistoryStatus)).required(),
  exchange: Joi.string().required(),
  retry_count: Joi.string().required(),
  delay_in_secs: Joi.number().required(),
  message_data: Joi.object({}).unknown(true).required(), 
  meta_data: Joi.object({
    error: Joi.string().optional()
  }).optional()
}
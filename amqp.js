const amqp = require('amqplib'),
  Errors = require('./common/errors'),
  BaseHelper = require('./base-helper');

// API refernce - https://amqp-node.github.io/amqplib/channel_api.html
// Guides - https://www.rabbitmq.com/tutorials/tutorial-three-javascript
// https://medium.com/@rafael.guzman/how-to-consume-publish-rabbitmq-message-in-nodejs-cb68b5a6484c
class AMQP extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context)
  }

  async init() {
    const me = this
    try {
      me.dependencies.amqp = await amqp.connect({
        protocol: me.configs.amqp.protocol,
        hostname: me.configs.amqp.host,
        port: me.configs.amqp.port,
        username: me.configs.amqp.user,
        password: me.configs.amqp.password
      })
    } catch (e) {
      throw e
    }
  }

  async consume(queue) {
    const me = this
    try {
      let channel = await me.dependencies.amqp.createChannel()
      channel.consume(queue, async function (msg) {
        if (msg.content) {
          await me.processMessage(msg.content.toString())
        }
      });
    } catch (e) {
      throw e
    }
  }

  async publish(exchange, message, routingKey = '') {
    const me = this
    try {
      let channel = await me.dependencies.amqp.createChannel()
      let isSuccess = channel.publish(exchange, routingKey, Buffer.from(message))
      if (!isSuccess) {
        throw new Errors.FailedToPublish()
      }
    } catch (e) {
      throw e
    }
  }

  async sendToQueue(queue, message) {
    const me = this
    try {
      let channel = await me.dependencies.amqp.createChannel()
      let isSuccess = channel.sendToQueue(queue, Buffer.from(message))
      if (!isSuccess) {
        throw new Errors.FailedToSendToQueue()
      }
    } catch (e) {
      throw e
    }
  }

  async processMessage() {
    // To be implemented by caller
  }
}

module.exports = AMQP
const _ = require("lodash"),
  Amqp = require("./../amqp"),
  DB = require("./../db"),
  Config = require("./../config");

class BaseConsumer {
  constructor() {
    this.dependencies = {};
    this.configs = {};
    this.context = {};
  }

  fetchConfig() {
    const me = this;
    let config = new Config(me.dependencies, me.configs, me.context);
    config.init();
  }

  initDBConnection() {
    const me = this;
    let db = new DB(me.dependencies, me.configs, me.context);
    db.init();
  }

  async initAmqpConnection() {
    const me = this;
    let amqp = new Amqp(me.dependencies, me.configs, me.context);
    await amqp.init();
  }

  async consume() {
    const me = this;
    let channel = await me.dependencies.amqp.createChannel();
    let exchangeMappings = me.configs.amqp.mappings;
    let queues = [];
    for (let mapping of exchangeMappings) {
      let exchange = _.get(mapping, "exchange");
      let type = _.get(mapping, "type", "direct");
      let bindings = _.get(mapping, "bindings", []);
      await channel.assertExchange(exchange, type);
      for (let binding of bindings) {
        let queue = _.get(binding, "queue");
        let routingKey = _.get(binding, "routing_key", "");
        await channel.assertQueue(queue);
        await channel.bindQueue(queue, exchange, routingKey);
        queues.push(queue);
      }
    }
    queues = _.uniq(queues);
    for (let q of queues) {
      channel.consume(q, async function (msg) {
        if (msg.content) {
          try {
            await me.processMessage(msg.content.toString());
            channel.ack(msg);
          } catch (e) {
            channel.ack(msg);
          }
        }
      });
    }
  }

  async processMessage(message, ack) {
    const me = this;
    try {
      console.log(message);
      ack();
    } catch (e) {
      ack();
    }
  }

  async start() {
    const me = this;
    try {
      me.fetchConfig();
      me.initDBConnection();
      await me.initAmqpConnection();
      console.log("Listening for messages...");
      await me.consume();
    } catch (e) {
      throw e;
    }
  }
}

new BaseConsumer().start();

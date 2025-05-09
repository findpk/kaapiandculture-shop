const _ = require("lodash"),
  BaseWorker = require("./base-worker"),
  Amqp = require("./../amqp"),
  Enum = require("./../common/enum"),
  MessageHistoryAccessor = require("./../db-accessors/message-history-accessor");

class RequeueWorker extends BaseWorker {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
  }

  async setDependencies() {
    const me = this;
    try {
      this.messageHistoryAccessor = new MessageHistoryAccessor(
        me.dependencies,
        me.configs,
        me.context,
      );
      this.amqp = new Amqp(me.dependencies, me.configs, me.context);
    } catch (e) {
      throw e;
    }
  }

  async run() {
    const me = this;
    try {
      let messages = me.messageHistoryAccessor.getByStatus(
        Enum.MessageHistoryStatus.Queued,
      );
      for (let message of messages) {
        if (me.checkIfDelayExists(message)) continue;
        let exchange = _.get(message, "data.exchange");
        let data = {
          id: _.get(message, "data.id"),
        };
        await me.amqp.publish(exchange, data);
      }
    } catch (e) {
      throw e;
    }
  }
}

let requeueWorker = new RequeueWorker({}, {}, {});
requeueWorker.start();

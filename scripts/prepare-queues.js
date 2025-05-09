const amqp = require("amqplib");

class PrepareQueues {
  constructor() { }

  async run() {
    const me = this;
    try {
      let conn = await amqp.connect("amqp://localhost");
      let channel = await conn.createChannel();
    } catch (e) {
      throw e;
    }
  }
}

new PrepareQueues().run();

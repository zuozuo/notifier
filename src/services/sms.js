'use strict';

const smsPool = require('./sms_pool');
const Notifier = require('./notifier');

async function deliver(ctx, message) {
  return Notifier.deliver(ctx, message, 'sms', () => {
    const smsClient = smsPool.acquire();
    return smsClient.then(client => {
      let phones = ctx.request.body.phones || process.env.PHONES;
      let content = `${phones}@${message.title}\r\n${message.content}\r\n`;
      client.write(content);
      return { success: true }
    })
  })
}

module.exports = { deliver }

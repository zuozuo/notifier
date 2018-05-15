'use strict';

const smsPool = require('./sms_pool');
const Notifier = require('./notifier');

async function deliver(ctx, message) {
  return Notifier.deliver(ctx, message, 'email', () => {
    const smsClient = smsPool.acquire();
    return smsClient.then(client => {
      let content = `${process.env.PHONES}@${message.title}\r\n${message.content}\r\n`;
      client.write(content);
    })
  })
}

module.exports = { deliver }

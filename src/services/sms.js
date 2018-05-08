'use strict';

const smsPool = require('./sms_pool');
const Notifier = require('./notifier');

async function deliver(message) {
  return Notifier.deliver(message, 'email', () => {
    const smsClient = smsPool.acquire();
    return smsClient.then(client => {
      client.write(`${process.env.PHONES}@${message.title}, ${message.content}\r\n`);
    })
  })
}

module.exports = { deliver }

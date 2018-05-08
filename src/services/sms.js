'use strict';

const smsPool = require('./sms_pool');
const Notifier = require('./notifier');

async function deliver(message) {
  return Notifier.deliver(message, 'email', () => {
    const smsClient = smsPool.acquire();
    return smsClient.then(client => {
      let content = `
      ${process.env.PHONES}@
      【${message.source}:${message.level}】
      ${message.title}, ${message.content}\r\n
      `;
      client.write(content);
    })
  })
}

module.exports = { deliver }

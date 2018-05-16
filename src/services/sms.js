'use strict';

const smsPool = require('./sms_pool');
const Notifier = require('./notifier');

async function deliver(ctx, message) {
  let callback = async function() {
    const smsClient = smsPool.acquire();
    return smsClient.then(client => {
      let body = ctx.request.body;
      let summary = body.commonAnnotations.summary;
      let desc = body.commonAnnotations.description;
      let phones = body.phones || process.env.PHONES;
      let content = `${phones}@${message.title}\r\n${summary}: ${desc}\r\n`;
      client.write(content);
      return { success: true }
    })
  }
  return Notifier.deliver(ctx, message, 'sms', callback);
}

module.exports = { deliver }

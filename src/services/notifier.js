'use strict';

const Message = require('../db/queries/messages');

async function retry(ctx, message, response, msgType, callback) {
  message.attampts += 1;
  let msg = await Message.updateMessage(message.id, {
    attampts: message.attampts,
    response: JSON.stringify(response)
  });
  if (message.retries > message.attampts) {
    return this.deliver(ctx, message, msgType, callback);
  }
  return false;
}

async function deliver(ctx, message, msgType, callback) {
  let response = JSON.parse(message.response || '{}');

  try {
    let res = await callback();
    response[msgType] = res;
    if (res['errorcode'] === 0 || res['response'].match('250 2.0.0 Ok')) {
      ctx.log(`INFO ${msgType} response`, res);
      await Message.updateMessage(message.id, {
        success: true,
        response: JSON.stringify(response)
      });
      return true;
    } else {
      ctx.log(`ERROR ${msgType} response`, res);
      return this.retry(ctx, message, response, msgType, callback);
    }
  } catch(e) {
    response[msgType] = { error: e.toString() };
    ctx.log(`ERROR ${msgType} response`, res);
    return this.retry(ctx, message, response, msgType, callback)
  }
}

module.exports = {
  retry,
  deliver
}

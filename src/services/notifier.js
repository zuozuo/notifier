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
    if (res['errorcode'] === 0) {
      ctx.log('INFO baiduhi response', res);
      await Message.updateMessage(message.id, {
        success: true,
        response: JSON.stringify(response)
      });
      return true;
    } else {
      ctx.error(`${msgType} ${res}`);
      return this.retry(ctx, message, response, msgType, callback);
    }
  } catch(e) {
    response[msgType] = { error: e.toString() };
    ctx.error(`${msgType} ${e}`);
    return this.retry(ctx, message, response, msgType, callback)
  }
}

module.exports = {
  retry,
  deliver
}

'use strict';

const rp = require('request-promise');
const Notifier = require('./notifier');

async function deliver(ctx, message) {
  return Notifier.deliver(ctx, message, 'baiduhi', () => {
    let env = process.env;
    let content = `【${message.source}:${message.level}】${message.title}\n${message.content}`;
    let baiduhiGroupId = ctx.request.body.baiduhi_group_id || env.BAIDUHI_GROUP_ID;
    let options = {
      json: true,
      method: 'POST',
      body: {
        content: content,
        msg_type: 'text',
        to: parseInt(baiduhiGroupId)
      },
      uri: `${env.BAIDUHI_URL}?access_token=${env.BAIDUHI_TOKEN}`
    };
    return rp(options);
  })
}

module.exports = { deliver }

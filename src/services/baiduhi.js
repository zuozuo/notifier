'use strict';

const rp = require('request-promise');
const Notifier = require('./notifier');

async function deliver(message) {
  return Notifier.deliver(message, 'baiduhi', () => {
    let env = process.env;
    let content = `【${message.source}:${message.level}】${message.title}\n${message.content}`;
    let options = {
      json: true,
      method: 'POST',
      body: {
        content: content,
        msg_type: 'text',
        to: parseInt(env.BAIDUHI_GROUP_ID)
      },
      uri: `${env.BAIDUHI_URL}?access_token=${env.BAIDUHI_TOKEN}`
    };
    return rp(options);
  })
}

module.exports = { deliver }

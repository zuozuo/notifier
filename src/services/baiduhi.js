'use strict';

const rp = require('request-promise');
const Notifier = require('./notifier');

async function deliver(message) {
  return Notifier.deliver(message, 'baiduhi', () => {
    let env = process.env;
    let options = {
      json: true,
      method: 'POST',
      body: {
        msg_type: 'text',
        content: message.title,
        to: parseInt(env.BAIDUHI_GROUP_ID)
      },
      uri: `${env.BAIDUHI_URL}?access_token=${env.BAIDUHI_TOKEN}`
    };
    return rp(options);
  })
}

module.exports = { deliver }

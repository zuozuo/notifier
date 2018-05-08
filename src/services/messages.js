smsService = require('./sms');
mailService = require('./mail');
baiduhiService = require('./baiduhi');

function deliver(message) {
  if (['error', 'fatal'].includes(message.level)) {
    smsService.deliver(message);
    mailService.deliver(message);
  }
  baiduhiService.deliver(message);
}

module.exports = { deliver };

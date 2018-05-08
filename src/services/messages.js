smsService = require('./sms');
mailService = require('./mail');
baiduhiService = require('./baiduhi');

function deliver(message) {
  smsService.deliver(message);
  // mailService.deliver(message);
  // baiduhiService.deliver(message);
}

module.exports = { deliver };

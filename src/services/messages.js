smsService = require('./sms');
mailService = require('./mail');
baiduhiService = require('./baiduhi');

function deliver(ctx, message) {
  if (['error', 'fatal'].includes(message.level)) {
    smsService.deliver(ctx, message);
    mailService.deliver(ctx, message);
  }
  baiduhiService.deliver(ctx, message);
}

module.exports = { deliver };

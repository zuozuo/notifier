'use strict';

const nodemailer = require('nodemailer');

const Notifier = require('./notifier');

async function deliver(ctx, message) {
  let callback = async function() {
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 25,
      secure: false,
    });

    let emails = ctx.request.body.emails || process.env.MAIL_RECEIVERS;

    const mailOptions = {
      from: '"Kittai Alert" <alert@kittai.com>',
      to: emails,
      subject: `【${message.source}:${message.level}】${message.title}`,
      html: message.content
    };
    let res = await transporter.sendMail(mailOptions);
    res.success = !!res['response'].match('250 2.0.0 Ok');
    return res;
  }

  return Notifier.deliver(ctx, message, 'email', callback);
}

module.exports = { deliver }

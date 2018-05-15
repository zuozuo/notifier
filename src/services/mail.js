'use strict';

const nodemailer = require('nodemailer');

const Notifier = require('./notifier');

async function deliver(ctx, message) {
  return Notifier.deliver(ctx, message, 'email', () => {
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
    return transporter.sendMail(mailOptions);
  })
}

module.exports = { deliver }

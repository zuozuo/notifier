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

    const mailOptions = {
      from: '"Kittai Alert" <alert@kittai.com>',
      to: process.env.MAIL_RECEIVERS,
      subject: `【${message.source}:${message.level}】${message.title}`,
      html: message.content
    };
    return transporter.sendMail(mailOptions);
  })
}

module.exports = { deliver }

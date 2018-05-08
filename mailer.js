'use strict';
const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {
  let transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: false, // true for 465, false for other ports
  });

  let mailOptions = {
    from: '"Fred Foo ð»" <foo@example.com>', // sender address
    to: 'zuoyonghui@baidu.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  };
  async function test() {
    let res = await transporter.sendMail(mailOptions);
    console.log(res)
  }
  try {
    console.log(111111111);
    test()
  } catch(e) {
    console.log(e);
  }
  //transporter.sendMail(mailOptions).then(function(info){
    //console.log(info);
  //}).catch(function(err){
    //console.log(err);
  //})
});

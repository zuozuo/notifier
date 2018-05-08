// require('dotenv').config()
// let testService = require('./test_service');
// testService.deliverMessage()
// const rp = require('request-promise');
// async function test(message) {
//   let env = process.env;
//
//   var options = {
//     method: 'POST',
//     uri: `${env.BAIDUHI_URL}?access_token=${env.BAIDUHI_TOKEN}`,
//     body: {
//       msg_type: 'text',
//       content: message.title,
//       to: parseInt(env.BAIDUHI_GROUP_ID)
//     },
//     json: true
//   };
//   return await rp(options);
// }
//
// test({title: 'xxxx'})
//
var net = require('net');
const MSG_SERVER = "emp02.baidu.com"
const MSG_PORT = 15003

var client = new net.Socket();
client.connect(MSG_PORT, MSG_SERVER, function() {
  console.log('Connected');
  client.write('18601257148@hello');
});

client.on('data', function(data) {
  console.log('Received: ' + data);
  client.destroy(); // kill client after server's response
});

client.on('close', function() {
  console.log('Connection closed');
});

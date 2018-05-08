const net = require('net');
const genericPool = require("generic-pool");

const factory = {
  create: function() {
    let env = process.env;
    let client = new net.Socket();
    client.connect(env.MSG_PORT, env.MSG_SERVER);
    return client;
  },
  destroy: function(client) {
    client.disconnect();
  }
};

const opts = {
  max: 20, // maximum size of the pool
  min: 5 // minimum size of the pool
};

const smsPool = genericPool.createPool(factory, opts);
module.exports = smsPool;

// const resourcePromise = myPool.acquire();
// resourcePromise
//   .then(function(client) {
//     client.write('18601257148@world!\r\n');
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

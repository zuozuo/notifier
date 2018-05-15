const dateFormat = require('dateformat');

function log(type, object) {
  let now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  console.log('[%s] %s %s %j', now, this.logid, type, object);
}

function logString(type, string) {
  let now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  console.log('[%s] %s %s %s', now, this.logid, type, string);
}

function info(object) {
  this.log('INFO ', object);
}

function error(object) {
  this.log('ERROR', object);
}

module.exports = {
  log,
  info,
  error,
  logString
};

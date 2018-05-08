require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const messageRoutes = require('./routes/messages');

const app = new Koa();

app.use(bodyParser());
app.use(messageRoutes.routes());

const server = app.listen(process.env.SERVICE_PORT, () => {
  console.log(`Server listening on port: ${process.env.SERVICE_PORT}`);
});

module.exports = server;

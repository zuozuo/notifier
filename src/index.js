require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const messageRoutes = require('./routes/messages');

const app = new Koa();
const PORT = 3000;

app.use(bodyParser());
app.use(messageRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;

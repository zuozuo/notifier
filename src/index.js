require('dotenv').config();
const Koa = require('koa');
const uuidv1 = require('uuid/v1');
const bodyParser = require('koa-bodyparser');

const messageRoutes = require('./routes/messages');
const prometheusRoutes = require('./routes/prometheus');

const app = new Koa();

const logger = require('./services/logger');

app.context.log = logger.log;
app.context.info = logger.info;
app.context.error = logger.error;
app.context.logString = logger.logString;

app.use(bodyParser());

app.use(async (ctx, next) => {
  let start = new Date();
  ctx.logid = uuidv1();
  ctx.log(ctx.method, ctx.url);
  ctx.log('BODY', ctx.request.body);
  await next();
  let time = new Date() - start;
  ctx.logString(ctx.response.message, `${ctx.response.status} ${time}ms`);
});

app.use(messageRoutes.routes());
app.use(prometheusRoutes.routes());

const server = app.listen(process.env.SERVICE_PORT, () => {
  console.log(`Server listening on port: ${process.env.SERVICE_PORT}`);
});

module.exports = server;

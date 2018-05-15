const Router = require('koa-router');

const router = new Router();
const BASE_URL = `/notifier/prometheus`;

const handler = require('./handler');

router.post(`${BASE_URL}/test`, async (ctx) => {
  let msgJson = {
    title: "Prometheus Test Alert",
    content: ctx.request.body,
    source: "prometheus",
    level: "error"
  }
  let res = await handler.handleRequest(ctx, msgJson);
  ctx.body = res.body;
  ctx.status = res.status;
})

router.post(`${BASE_URL}/production`, async (ctx) => {
  let msgJson = {
    title: "Prometheus Production Alert",
    content: ctx.request.body,
    source: "prometheus",
    level: "fatal"
  }
  let res = await handler.handleRequest(ctx, msgJson);
  ctx.body = res.body;
  ctx.status = res.status;
})

module.exports = router;

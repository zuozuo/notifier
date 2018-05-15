const Router = require('koa-router');

const router = new Router();
const BASE_URL = `/notifier/messages`;

const handler = require('./handler');

router.post(`${BASE_URL}`, async (ctx) => {
  let res = await handler.handleRequest(ctx, ctx.request.body);
  ctx.body = res.body;
  ctx.status = res.status;
})

module.exports = router;

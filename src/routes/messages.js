const Router = require('koa-router');

const router = new Router();
const BASE_URL = `/notifier/messages`;

const handler = require('./handler');

router.post(`${BASE_URL}`, async (ctx) => {
  let body = ctx.request.body;
  let msgJson = {
    title: body.title,
    level: body.level,
    source: body.source,
    content: body.content,
  }
  let res = await handler.handleRequest(ctx, msgJson);
  ctx.body = res.body;
  ctx.status = res.status;
})

module.exports = router;

const Router = require('koa-router');
const Message = require('../db/queries/messages');
const messageService = require('../services/messages');

const router = new Router();
const BASE_URL = `/api/v1/messages`;

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const messages = await Message.addMessage(ctx.request.body);
    let message = messages[0];
    if (message) {
      await messageService.deliver(message)
      ctx.status = 201;
      ctx.body = { status: 'success' };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

module.exports = router;

const Message = require('../db/queries/messages');
const messageService = require('../services/messages');

async function handleRequest(ctx, msgJson) {
  try {
    const messages = await Message.addMessage(msgJson);
    let message = messages[0];
    if (message) {
      await messageService.deliver(ctx, message)
      return {
        status: 201,
        body: { status: 'success' }
      }
    } else {
      return {
        status: 400,
        body: {
          status: 'error',
          message: 'Something went wrong.'
        }
      }
    }
    return ctx;
  } catch (err) {
    return {
      status: 400,
      body: {
        status: 'error',
        message: err.message || 'Sorry, an error has occurred.'
      }
    }
    return ctx;
  }
}

module.exports = { handleRequest }

const express = require('express');

const apiRouter = express.Router();

module.exports = ({ contract }) => {
  const { apiController } = require('../controller')({ contract });

  apiRouter.post('/webhook', apiController.processWebhook);
  apiRouter.post('/init', apiController.init);

  return apiRouter;
}

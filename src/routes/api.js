const express = require('express');

const apiRouter = express.Router();

module.exports = ({ contract, pushProtocolSDK }) => {
  const { apiController } = require('../controller')({ contract, pushProtocolSDK });

  apiRouter.post('/webhook', apiController.processWebhook);
  apiRouter.post('/init', apiController.init);

  return apiRouter;
}

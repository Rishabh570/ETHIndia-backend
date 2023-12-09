const express = require('express');

const loaders = require('./loaders');
const { apiRoutes } = require('./routes');
const { HTTP_STATUS_CODES } = require('../constants');

const app = express();

loaders
  .run()
  .then(({ contract }) => {
    app.use(express.urlencoded({ limit: '5mb', extended: true }));
    app.use(express.json({ limit: '5mb' }));

    // Health check route
    app.get('/health', (req, res) => {
      res.status(HTTP_STATUS_CODES.SUCCESS).json({ status: true });
    });

    // Main app route(s)
    app.use('/api/v1', apiRoutes({ contract }));

    // Error handlers
    process.on('uncaughtException', (err) => {
      console.error(`uncaughtException error: ${err}`);
      process.exit(1);
    });

    process.on('unhandledRejection', (err) => {
      console.error(`uncaughtRejection error: ${err}`);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error(`Could not initialize server: ${err}`);
    process.exit(1);
  });

module.exports = app;

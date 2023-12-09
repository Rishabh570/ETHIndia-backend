module.exports = ({ contract, pushProtocolSDK }) => {
  const apiController = require('./api')({ contract, pushProtocolSDK });

  return {
    apiController,
  }
};

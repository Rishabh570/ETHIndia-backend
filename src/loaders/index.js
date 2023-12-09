// const serviceLoader = require('./service');
const web3 = require('./web3');
const pushProtocol = require('./pushProtocol');

module.exports = {
  run: () => {
    return new Promise(async (resolve) => {
      const contract = await web3.run();
      const pushProtocolSDK = await pushProtocol.run();
      // const service = serviceLoader.init({  });
      // other dependencies init goes here...

      resolve({ contract, pushProtocolSDK });
    });
  },
};

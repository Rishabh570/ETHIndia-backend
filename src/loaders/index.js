// const serviceLoader = require('./service');
const web3 = require('./web3');

module.exports = {
  run: () => {
    return new Promise(async (resolve) => {
      const contract = await web3.run();
      // const service = serviceLoader.init({  });
      // other dependencies init goes here...

      resolve({ contract });
    });
  },
};

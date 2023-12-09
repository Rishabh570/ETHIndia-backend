const { PushAPI } = require('@pushprotocol/restapi');
const {ethers } = require('ethers');


module.exports = {
  run: async () => {
    // Using random signer from a wallet, ideally this is the wallet you will connect
    const signer = ethers.Wallet.createRandom();

    return PushAPI.initialize(signer, { env: 'staging' });
  }
}
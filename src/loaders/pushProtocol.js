const { PushAPI } = require('@pushprotocol/restapi');
const {ethers } = require('ethers');

const config = require('../../config');

module.exports = {
  run: async () => {
    // Using random signer from a wallet, ideally this is the wallet you will connect
    const signer = new ethers.Wallet(config.WALLET_PRIVATE_KEY);

    return PushAPI.initialize(signer, { env: 'staging' });
  }
}
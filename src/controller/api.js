const octonode = require('octonode');

const { HTTP_STATUS_CODES } = require('../../constants');

const client = octonode.client("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");


// Import Push SDK & Ethers
// const { PushAPI } = require('@pushprotocol/restapi');
// const {ethers } = require('ethers');

// Using random signer from a wallet, ideally this is the wallet you will connect
// const signer = ethers.Wallet.createRandom();

// Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps

module.exports = ({ contract, pushProtocolSDK }) => {
  async function processWebhook(req, res) {
    try {  
      // await service.itemService.create();
      console.log('processing webhook...');
      console.log('processing webhook finished!');
      console.log('req: ', req);

      
      
      // TODO: Check the type of webhook
      // - If PR merged, send each authors' diff to the contract (contract will do the calculation; improvement do it using chainlink fn)
      // - If PR closed, tell contract to refund supporters (aka stakers)
      // - If a commit push event, tell the contract to update the PR => author mapping if doesn't exist already in map
      // ignore otherwise




      // TODO: Sending notifications starts

      // 1. If PR merged webhook, send a push notif to author(s) telling they won a reward of X ether
      // 2. If a new supporter supports a PR, all the author(s) of the PR should get push notif
      // 3. If PR closed, both supporters and PR author(s) should get appropriate push notif

      // Send a notification to users of your protocol
      // TODO: If PR merged - we need wallet address of author(s) and supporter(s)
      // TODO: If PR closed - same
      // TODO: IF commit added - wallet address of author(s)
      // const apiResponse = await pushProtocolSDK.channel.send(['0x008Bb226aF820808810211dBe1E6e541D4Ec5D8E'], {
      //   notification: {
      //     title: 'Hello World Notification',
      //     body: 'Web3 native notifications are here!',
      //   }
      // });
      // console.log('apiResponse: ', apiResponse);

      // Sending notifications ends

  


      // Return the newly generated item
      return res.status(HTTP_STATUS_CODES.SUCCESS).json({
        status: true,
        message: 'Webhook processed successfully',
        data: null,
      });
    } catch (err) {
      console.log('err: ', err);
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: 'Could not process webhook',
        error: err,
      });
    }
  }

  // performs initial sync with the github repo
  // fetches open PRs, and communicates with smart contract to store retrieved info into the mapping
  async function init(req, res) {
    try {
      // TODO: Get user and repo name from chrome extension
      // extension will hit /api/v1/init when repo owner clicks on onboard from the extension
      const ghrepo = client.repo('rishabh570/all-contributors-test');
      ghrepo.prs({ state: 'open' }, (err, prs) => {
        if (err) {
          console.error('Error fetching open pull requests:', err.message);
          return;
        }
  
        const openPRs = prs.map(pr => console.log('pr: ', pr));
        console.log('Open Pull Requests:', openPRs);

        // TODO: Push all of this info the chain
        // Store data from sync to the chain in mappings (refer google doc for mappings)

  
        return res.status(HTTP_STATUS_CODES.SUCCESS).json({
          status: true,
          message: 'Initial sync is successful',
          data: openPRs,
        });
      });
    }
    catch (err) {
      console.log('[init] err: ', err);
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: 'Initial sync failed',
        error: err,
      }); 
    }
  }

  return {
    processWebhook,
    init,
  }
};

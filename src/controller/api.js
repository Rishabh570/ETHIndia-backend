const octonode = require('octonode');

const { HTTP_STATUS_CODES } = require('../../constants');

const client = octonode.client("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");

module.exports = ({ contract }) => {
  async function processWebhook(req, res) {
    try {  
      // await service.itemService.create();
      console.log('processing webhook...');
      console.log('processing webhook finished!');
      console.log('req: ', req);

      // TODO: Update the commit activity on chain
      // Update the corresponding mapping in smart contract

  
      // Return the newly generated item
      return res.status(HTTP_STATUS_CODES.SUCCESS).json({
        status: true,
        message: 'Item created successfully',
        data: null,
      });
    } catch (err) {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: 'Could not create item',
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

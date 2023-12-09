// const Web3 = require('web3');
const config = require('../../config');

// const infuraUrl = `https://mainnet.infura.io/v3/${config.INFURA_API_KEY}`;
// console.log('infuraUrl: ', infuraUrl);

const { ethers } = require('ethers');
console.log('ethers: ', ethers);

// Connect to an Ethereum node (e.g., Infura)
const infuraUrl = `https://mainnet.infura.io/v3/${config.INFURA_API_KEY}`;
console.log('infuraUrl: ', infuraUrl);
const provider = ethers.getDefaultProvider('sepolia');
console.log('provider: ', provider);
// const provider = new ethers.providers.Web3Provider(web3.currentProvider);

const contractAddress = '0xb2B3268459e78775323225F0c273a543B109242D';
const contractABI = [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


module.exports = {
  run: async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    console.log('contract: ', contract);
    return contract;
    // const result = await contract.retrieve();
    // console.log('Result of someFunction:', result);
    // return result;
  }
}
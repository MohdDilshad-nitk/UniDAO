const ethers = require('ethers');
const contractABI = require("./myNFTABI.json"); // Replace with your ABI file path
require('dotenv').config();

const API_URL = "Your API URL";

// const privateKey = `0x${PRIVATE_KEY}`;
const privateKey = '0x' + 'Your Private Key';
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const wallet = new ethers.Wallet(privateKey, provider);

// Define the contract address and ABI
const contractAddress = '0x8dbCB48DDb8D9F0639C57933DB616d38d9B63C46';


// Connect to the contract
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Mint an NFT (assuming the contract has a mint function)
async function mintNFT() {
  try {

    // Mint the NFT
    const transaction = await contract.mint();
    await transaction.wait();

    console.log('NFT minted successfully.');
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
}

// Call the mintNFT function to mint an NFT
mintNFT();


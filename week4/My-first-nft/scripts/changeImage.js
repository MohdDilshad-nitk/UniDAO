const ethers = require('ethers');
const contractABI = require("./myNFTABI.json"); 
require('dotenv').config();

const API_URL = "Your API URL";

// const privateKey = `0x${PRIVATE_KEY}`;
const privateKey = 'Your Private Key';
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const wallet = new ethers.Wallet(privateKey, provider);

// Define the contract address and ABI
const contractAddress = '0x8dbCB48DDb8D9F0639C57933DB616d38d9B63C46';


// Connect to the contract
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Token ID of the NFT you want to change
const tokenIdToChange = 1; // Replace with the desired token ID

// New image URI
const newImageURI = "https://copper-tropical-mandrill-98.mypinata.cloud/ipfs/QmSdQY7C71ftPi8w6p4NdmZonX8ZPRcDmH2CB6Rw7FP5hH"; // Replace with the new image URI

// Change the image of the NFT
async function changeNFTImage() {
  try {
    // Call the changeImage function to update the image
    const transaction = await contract.changeImage(tokenIdToChange, newImageURI);
    await transaction.wait();

    console.log('NFT image changed successfully.');
  } catch (error) {
    console.error('Error changing NFT image:', error);
  }
}

// Call the changeNFTImage function to change the image of the NFT
changeNFTImage();

async function main() {

    const ownerAddress = 'owner address';
    // Grab the contract factory
    const MyNFT = await ethers.getContractFactory("TVNFT");
 
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFT.deploy(ownerAddress); // Instance of the contract
    console.log("Contract deployed to address:", myNFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
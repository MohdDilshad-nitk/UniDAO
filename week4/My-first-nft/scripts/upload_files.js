// https://copper-tropical-mandrill-98.mypinata.cloud/ipfs/CID

const axios = require('axios')
const FormData = require("form-data")
const fs = require("fs")
require('dotenv').config()

const JWT = "Your JWT of pinata"


const pinFileToIPFS = async (file_path, file_name) => {
  const formData = new FormData();
  const src = file_path;
  
  const file = fs.createReadStream(src)
  formData.append("file", file)
  
  const pinataMetadata = JSON.stringify({
    name: file_name,
  });
  formData.append('pinataMetadata', pinataMetadata);
  
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', pinataOptions);

  try{
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`
      }
    });
    // console.log(res.data);
    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
}

const uploadMetadata = async (name, description, CID) => {
  try {
    const data = JSON.stringify({
      pinataContent: {
        name: `${name}`,
        description: `${description}`,
        image: `https://copper-tropical-mandrill-98.mypinata.cloud/ipfs/${CID}`,
      },
      pinataMetadata: {
        name: "Pinnie NFT Metadata",
      },
    });


    const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT}`
      }
    });

    console.log(res.data);
    return res.data.IpfsHash; 
  } catch (error) {
    console.log(error)
  }
}


var images = ["alienX.png","croma_stone.png","four_Arms.png","way_big.jpg"];
var names = ["Alien X","Croma Stone","Four Arms","Way Big"];
var descriptions = ["Alien X is the Omnitrix's DNA sample of a Celestialsapien from the Forge of Creation.","Croma Stone is the Omnitrix's DNA sample of a Crystalsapien from Petropia.","Four Arms is the Omnitrix's DNA sample of a Tetramand from Khoros.","Way Big is the Omnitrix's DNA sample of a To'kustar from the planet Cosmic Storm."];
var IpfsHashes = [];

for (let i = 0; i < images.length; i++) {
  pinFileToIPFS(`../images/${images[i]}`,`${names[i]}`).then((CID) => {
    var hash = uploadMetadata(names[i],descriptions[i],CID);
    IpfsHashes.push(hash);
  });
}


// // print all hashes
// setTimeout(() => {
//   console.log(IpfsHashes);
// }, 20000);


//results
// [
//   "https://copper-tropical-mandrill-98.mypinata.cloud/ipfs/QmSdQY7C71ftPi8w6p4NdmZonX8ZPRcDmH2CB6Rw7FP5hH",
//   "https://copper-tropical-mandrill-98.mypinata.cloud/ipfs/QmQU41V6CD9Apf12uUvM5DaxajrvyYARPPV2xb8Ko69oCQ",
//   "https://copper-tropical-mandrill-98.mypinata.cloud/ipfs/QmeRR4kaqck2SFJMJupWHcoz9kUJ9vM5hoNHKiy846odVn",
//   "https://copper-tropical-mandrill-98.mypinata.cloud/ipfs/QmXhxi9CT4Kvjzaq2YdhgBQ6shojPZNRiBudmP4DgUvq1d"

// ]
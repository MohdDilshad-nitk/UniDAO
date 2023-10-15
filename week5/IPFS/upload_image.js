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



  pinFileToIPFS('../images/four_Arms.png',"Four Arms").then((CID) => {
    console.log(CID);
  });



//result
//   "https://copper-tropical-mandrill-98.mypinata.cloud/ipfs/Qmej5mBSZJqsuGRi2uZCDKhbyj4h4WM26BcZudHQYD8Gro",


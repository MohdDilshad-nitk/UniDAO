//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract TVNFT is ERC721, Ownable {
    uint256  _totalSupply;
    mapping (uint256 => string) _tokenImages;

    constructor(address _intitialOwner) ERC721("TV Characters NFT", "TVNFT") Ownable() {}

    function mint() public onlyOwner {
        require(_totalSupply < 3000, "Maximum limit reached.");
        uint256 tokenId = _totalSupply + 1;
        _mint(msg.sender, tokenId);
        _totalSupply++;
        
    }

    function changeImage(uint256 tokenId, string memory newImageURI) public {
        require(ownerOf(tokenId) == msg.sender || isApprovedForAll(ownerOf(tokenId), msg.sender) || getApproved(tokenId) == msg.sender, "Not the owner or approved.");
        _tokenImages[tokenId] = newImageURI;
    }


    function tokenImageURI(uint256 tokenId) public view returns (string memory) {
        return _tokenImages[tokenId];
    }

}

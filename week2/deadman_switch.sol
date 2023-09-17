// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

contract AutoSend {

    address public owner;
    address public presetAddress;
    uint public lastActivityBlock;

    constructor(address _presetAddress) payable {
        owner = msg.sender;
        presetAddress = _presetAddress;
        lastActivityBlock = block.number;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function still_alive() public onlyOwner {
        lastActivityBlock = block.number;
    }

    function checkActivity() public view  {
        require(block.number - lastActivityBlock <= 10, "Owner hasn't called still_alive in the last 10 blocks");
    }


    function sendBalanceToPresetAddress() public {
        require(block.number - lastActivityBlock > 10, "Owner is still active.");       
        
        address payable receiver = payable(presetAddress);
        selfdestruct(receiver);
    }

    
}

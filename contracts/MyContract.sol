//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyContract {
    uint256 internal dataNb;
    uint256 internal cpt;

    constructor(uint256 _number) {
        dataNb = _number;
    }

    function readNb() public view returns (uint256) {
        return dataNb;
    }

    function readCpt() public view returns (uint256) {
        return cpt;
    }

    function setNumber(uint256 _number) public {
        dataNb = _number;
        cpt++;
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract AssetReceiver {
    address payable public owner;
    address payable public creator;
    address public token;
    uint256 public chainId;
    bool public initialized;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address _creator) {
        owner = payable(msg.sender);
        creator = payable(_creator);
        // token = _token;
        // chainId = _chainId;
    }

    // fallback() external payable {}

    function initialize(address _token, uint256 _chainId) public onlyOwner {
        require(!initialized, "Already initialized");
        token = _token;
        chainId = _chainId;
        initialized = true;
    }

    function execute(
        address[] memory contracts,
        bytes[] calldata data,
        uint256[] memory values
    ) external {
        for (uint i = 0; i < contracts.length; i++) {
            require(values[i] <= address(this).balance, "Not enough balance");
            (bool success, ) = contracts[i].call{value: values[i]}(data[i]);
            require(success, "Failed to execute swap");
        }
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./AssetReceiver.sol";

contract AssetReceiverFactory {
    address payable public owner;
    
    // hash - 0x6f5c3fd72a76cee4eae5b19c7d170e5ffb7f132ef0f26296a1f46ec2bb3faaf2
    event AssetReceiverDeployed(
        address indexed assetReceiverAddress,
        address indexed owner,
        address token,
        uint256 chainId
    );

    constructor() {
        owner = payable(msg.sender);
    }
    
    function deploy(
        bytes32 _salt,
        address token,
        uint256 chainId
    ) public returns (address) {
        address assetReceiverAddress;
        bytes memory bytecode = getBytecode(msg.sender);
        assembly {
            assetReceiverAddress := create2(
                0,
                add(bytecode, 0x20),
                mload(bytecode),
                _salt
            )
            if iszero(extcodesize(assetReceiverAddress)) {
                revert(0, 0)
            }
        }
        AssetReceiver(payable(assetReceiverAddress)).initialize(token, chainId);
        emit AssetReceiverDeployed(
            assetReceiverAddress,
            msg.sender,
            token,
            chainId
        );
        return assetReceiverAddress;
    }

    function getBytecode(address user) public pure returns (bytes memory) {
        bytes memory bytecode = type(AssetReceiver).creationCode;
        return abi.encodePacked(bytecode, abi.encode(user));
    }
}


// 0xE7fC3a50a79985dC175C93790035A6Fbf342de30
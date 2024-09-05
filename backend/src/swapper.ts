// todo: take the assettransfer data and return the output to call the

import { ethers } from "ethers";
import { chainflipVaultABI } from "./abi/chainflipVault";
import { AssetTransferInterface } from "./models/AssetTransfer";
import { erc20ABI } from "./abi/erc20";
import { assetReceiverABI } from "./abi/assetReceiver";
import { ChainflipVaults, convertChainIdToChainFlipId, getWallet, tokenAddressToChainFlipAssetId } from "./utils/helpers";
import { chainflipInterface, erc20Interface, thorChainRouterInterface } from "./utils/interface";

const emptyByteString = ethers.encodeBytes32String("");

const swap = async (assetTransfer: AssetTransferInterface) => {
  const srcChain = assetTransfer.chain;
  const wallet = getWallet(srcChain);
  const assetReceiverAddress = assetTransfer.to;

  const assetReceiverContract = new ethers.Contract(
    assetReceiverAddress,
    assetReceiverABI,
    wallet
  );
  const srcTokenAmount = assetTransfer.rawAmount;

  let tx;
  console.log(`assetTransferddfs `, assetTransfer)
  console.log(assetTransfer.network == "testnet")

  if (assetTransfer.network == "testnet") {
    // todo: create a transaction to sign for calling chainflip vault function

    const chainflipVaultAddress = ChainflipVaults[srcChain];

    const dstChainId = convertChainIdToChainFlipId(assetTransfer.dstChain); // todo: right now the only dst chain is ETH SEPOLIA
    const dstAddress = ethers.getBytes(assetTransfer.dstAddress); // todo: change this to the desitnation address
    const dstToken = tokenAddressToChainFlipAssetId(assetTransfer.dstToken, assetTransfer.dstChain); // todo: change this to the asset from the user

    if (assetTransfer.native) {
      const swapTxData = chainflipInterface.encodeFunctionData("xSwapNative", [
        dstChainId,
        dstAddress,
        dstToken,
        emptyByteString,
      ]);
      tx = await assetReceiverContract.execute(
        [chainflipVaultAddress],
        [swapTxData],
        [srcTokenAmount]
      );
    } else {
      const srcToken = assetTransfer.token;
      const approveTxData = erc20Interface.encodeFunctionData("approve", [
        chainflipVaultAddress,
        srcTokenAmount,
      ]);
      const swapTxData = chainflipInterface.encodeFunctionData("xSwapToken", [
        dstChainId,
        dstAddress,
        dstToken,
        srcToken,
        srcTokenAmount,
      ]);
      tx = await assetReceiverContract.execute(
        [srcToken, chainflipVaultAddress],
        [approveTxData, swapTxData],
        [0]
      );
    }

  } else if (assetTransfer.network === "mainnet") {
    // console.log("COMING SOON...");
    const vaultAddress = "0x37f4bc8b3a06a751fc36baa928d3fa5b63a540fc";
    const routerAddress = "0x700E97ef07219440487840Dc472E7120A7FF11F4";
    const expiration = (Math.floor(Date.now() / 1000)) + (10 * 24 * 60 * 60);
    let memo;


    // SWAP: AVAX.ETH: ARBITRUM.USDC - 0xFF970A61A04b1ca14834A43f5de4533eBDDB5CC8: arb1exampleaddress: 100000000

    if (assetTransfer.native) {
      memo = `SWAP:AVAX.ETH:${"RECIEVER_ADDRESS"}:`;
    } else {
      memo = "";
    }

    const swapTxData = thorChainRouterInterface.encodeFunctionData("depositWithExpiry", [
      vaultAddress,
      assetTransfer.token,
      srcTokenAmount,
      memo,
      expiration
    ]);

    tx = await assetReceiverContract.execute(
      [routerAddress],
      [swapTxData],
      [srcTokenAmount]
    );
  }
  const receipt = await tx.wait();
};
export { swap };
import { ethers } from "ethers";
import { assetReceiverFactoryAbi } from "../abi/assetReceiverFactory";
import { erc20ABI } from "../abi/erc20";
import { chainflipVaultABI } from "../abi/chainflipVault";
import { thorChainRouterABI } from "../abi/thorChainRouter";

const assetReceiverFactoryInterface = new ethers.Interface(assetReceiverFactoryAbi);
const chainflipInterface = new ethers.Interface(chainflipVaultABI);
const erc20Interface = new ethers.Interface(erc20ABI);
const thorChainRouterInterface = new ethers.Interface(thorChainRouterABI);
export { assetReceiverFactoryInterface, chainflipInterface, erc20Interface, thorChainRouterInterface };
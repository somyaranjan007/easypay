import { ethers } from "ethers";
const ChainIds = {
  ArbitrumSepolia: "421614",
  EthereumSepolia: "11155111",
};
const ChainflipVaults = {
  [ChainIds.EthereumSepolia]: "0x36eaD71325604DC15d35FAE584D7b50646D81753",
  [ChainIds.ArbitrumSepolia]: "0x2bb150e6d4366A1BDBC4275D1F35892CD63F27e3",
};
const convertChainNameToNumber = (chainName: string) => {
  switch (chainName) {
    case "ETH_MAINNET":
      return "1";
    case "ETH_SEPOLIA":
      return "11155111";
    case "ARB_MAINNET":
      return "42161";
    case "ARB_SEPOLIA":
      return "421614";
  }
};

const convertChainIdToChainFlipId = (chainId: string) => {
  switch (chainId) {
    case ChainIds.EthereumSepolia:
      return 1;
    case ChainIds.ArbitrumSepolia:
      return 4;
  }
  return 0; // chain not supported
};
const convertChainIdToNetworkName = (chainId: string) => {
  let networkName = "eth-mainnet";
  switch (chainId) {
    case ChainIds.EthereumSepolia:
      networkName = "eth-sepolia";
      break;
    case ChainIds.ArbitrumSepolia:
      networkName = "arb-sepolia";
      break;
  }
  return networkName;
};
const getWallet = (chainId: string) => {
  const networkName = convertChainIdToNetworkName(chainId);
  const provider = new ethers.JsonRpcProvider(
    `https://${networkName}.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );
  return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
};

const tokenAddressToChainFlipAssetId = (
  tokenAddress: string,
  chainId: string
) => {
  if (chainId == ChainIds.EthereumSepolia) {
    switch (tokenAddress) {
      case "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238":
        return 2;
      case "0x27CEA6Eb8a21Aae05Eb29C91c5CA10592892F584":
        return 8;
      case "0x0000000000000000000000000000000000000000":
        return 1;
    }
  } else if (chainId == ChainIds.ArbitrumSepolia) {
    switch (tokenAddress) {
      case "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d":
        return 2;
      case "0x0000000000000000000000000000000000000000":
        return 1;
    }
  }
  return 0;
};

export {
  convertChainNameToNumber,
  tokenAddressToChainFlipAssetId,
  getWallet,
  convertChainIdToNetworkName,
  convertChainIdToChainFlipId,
  ChainIds,
  ChainflipVaults,
};

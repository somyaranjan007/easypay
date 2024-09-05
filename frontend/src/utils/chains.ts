import { defineChain,  } from "thirdweb";

export const sepoliaETH = defineChain({
    id: 11155111,
    name: "Sepolia",
    rpc: "https://rpc.test.btcs.network",
    testnet: true,
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    }
});
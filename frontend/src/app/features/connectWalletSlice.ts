import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ConnectWalletInterface } from "../../types/types";
import { StealthKeyRegistry } from "@umbracash/umbra-js";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const initialState: ConnectWalletInterface = {
  testnet: true,
  provider: null,
  signer: null,
  address: null,
  stealthKeyRegistry: null,
  loading: false,
  error: null,
};

type ConnectWalletReturnType =
  | {
      provider: ethers.providers.Web3Provider;
      signer: ethers.providers.JsonRpcSigner;
      address: string;
      stealthKeyRegistry: StealthKeyRegistry;
    }
  | undefined;

export const connectWallet = createAsyncThunk<
  ConnectWalletReturnType,
  void,
  {}
>("connectWallet", async (_, { rejectWithValue }) => {
  try {
    if (typeof (window as any).ethereum != "undefined") {
      const web3Provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const stealthKeyRegistry = new StealthKeyRegistry(web3Provider);
      return {
        provider: web3Provider,
        signer,
        address,
        stealthKeyRegistry,
      };
    }
  } catch (error) {
    toast.error("Error connecting to wallet");
    return rejectWithValue(error);
  }
});

const connectWalletSlice = createSlice({
  name: "connectWallet",
  initialState,
  reducers: {
    setTestnet: (state) => {
      state.testnet = true;
    },
    setMainnet: (state) => {
      state.testnet = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectWallet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(connectWallet.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.provider = action.payload?.provider ?? null;
      state.signer = action.payload?.signer ?? null;
      state.address = action.payload?.address ?? null;
      state.stealthKeyRegistry =
        (action.payload?.stealthKeyRegistry as any) ?? null;
    });
    builder.addCase(connectWallet.rejected, (state, action) => {
      console.log("error: ");
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setTestnet, setMainnet } = connectWalletSlice.actions;
export default connectWalletSlice.reducer;

// const sepoliaChainParams = {
//     chainId: numberToHex(sepolia.id),
//     chainName: sepolia.name,
//     nativeCurrency: {
//         name: sepolia.nativeCurrency.name,
//         symbol: sepolia.nativeCurrency.symbol,
//         decimals: sepolia.nativeCurrency.decimals,
//     },
//     rpcUrls: sepolia.rpcUrls.default.http,
//     blockExplorerUrls: [sepolia.blockExplorers.default.url],
// };

// 0x5ccD6B18468fe0Be6E9CAd0fc60D4Ae94159b85b
// 0x5ccD6B18468fe0Be6E9CAd0fc60D4Ae94159b85b

// await (window as any).ethereum.request({
//   method: 'wallet_addEthereumChain',
//   params: [sepoliaChainParams],
// });
// const userChainId = await (window as any).ethereum.request({ method: "eth_chainId" });
// if (userChainId != sepoliaChainParams.chainId) {
//   console.log("Failed to switch chain");
//   return;
// }
// await (window as any).ethereum.request({ method: "eth_requestAccounts" });

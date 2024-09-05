import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { transactionHistoryType } from "../../types/types";

type initialPublicTransactionDataType = {
  loading: boolean;
  publicTransactionHistory: transactionHistoryType[] | null;
  error: string | null;
};
const initialPublicTransactionData: initialPublicTransactionDataType = {
  loading: false,
  publicTransactionHistory: null,
  error: null,
};

export type transactionHistoryTypes = {
  sender: string | null;
  chain: string | null;
  date: string | null;
  asset: string | null;
  amount: string | null;
  txnhash: string | null;
  iswithdrawn: boolean;
  randomnumber: string | null;
  receiver: string | null;
  token: string | null;
  type: string | null;
};

export const fetchOnBoardingTxData = createAsyncThunk(
  "fetchOnBoardingTxData",
  async ({ contract }: { contract: string }, { rejectWithValue }) => {
    try {
      let publicTransactionHistory: transactionHistoryType[] = [];
      const data =
        (
          await axios.get(
            `https://nocturnis.serveo.net/get-transfer-info?address=${contract}`
          )
        ).data || [];

      for (let i = 0; i < data.length; i++) {
        const publicTransaction: transactionHistoryType = {
          sender: data[i]?.from,
          chain: data[i]?.chain,
          date: data[i]?.timestamp,
          asset:
            data[i]?.dstToken === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
              ? "NATIVE"
              : "TOKEN",
          amount: data[i]?.amount,
          txnhash: data[i]?.transactionHash,
          iswithdrawn: null,
          randomnumber: null,
          receiver: null,
          token: null,
          type: "public",
        };
        publicTransactionHistory.push(publicTransaction);
      }

      return { publicTransactionHistory };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const onBoardingTxData = createSlice({
  name: "onBoardingData",
  initialState: initialPublicTransactionData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOnBoardingTxData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOnBoardingTxData.fulfilled, (state, action) => {
      state.loading = false;
      state.publicTransactionHistory = action.payload
        .publicTransactionHistory as transactionHistoryType[];
    });
    builder.addCase(fetchOnBoardingTxData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default onBoardingTxData.reducer;

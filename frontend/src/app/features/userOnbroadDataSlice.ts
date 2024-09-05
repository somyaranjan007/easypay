import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type onBoardingDataType = {
  loading: boolean;
  address: string | null;
  createAt: Date | null;
  chainId: string | null;
  token: string | null;
  owner: string | null;
  error: string | null;
};

const initialOnBoardingDataType: onBoardingDataType = {
  loading: false,
  address: null,
  createAt: null,
  chainId: null,
  token: null,
  owner: null,
  error: null,
};

export const fetchOnBoardingData = createAsyncThunk(
  "fetchOnBoardingData",
  async ({ signer }: { signer: string }, { rejectWithValue }) => {
    try {
      const data = (
        await axios.get(
          `https://nocturnis.serveo.net/get-asset-receiver?owner=${signer}`
        )
      ).data;
      return {
        address: data?.address,
        createAt: new Date(),
        chainId: data?.chainId,
        token: data?.token,
        owner: data?.owner,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const onBoardingData = createSlice({
  name: "onBoardingData",
  initialState: initialOnBoardingDataType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOnBoardingData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOnBoardingData.fulfilled, (state, action) => {
      state.loading = false;
      state.address = action.payload?.address ?? null;
      state.createAt = action.payload?.createAt ?? null;
      state.chainId = action.payload?.chainId ?? null;
      state.token = (action.payload?.token as any) ?? null;
      state.owner = (action.payload?.owner as any) ?? null;
    });
    builder.addCase(fetchOnBoardingData.rejected, (state, action) => {
      console.log("error: ");
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default onBoardingData.reducer;

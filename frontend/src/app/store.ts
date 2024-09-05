import { configureStore } from '@reduxjs/toolkit';
import thirdWebReducer from "./features/thirdWebSlice";
import connectWalletReducer from "./features/connectWalletSlice";
import onBoardingReducer from "./features/userOnbroadDataSlice";
import onBoardingTxReducer from "./features/userOnboardTxDataSlice";

export const store = configureStore({
  reducer: {
    thirdWeb: thirdWebReducer,
    connectWallet: connectWalletReducer,
    publicOnBoarding: onBoardingReducer,
    publicOnBoardingTx: onBoardingTxReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
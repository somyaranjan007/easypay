import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "./pages/Hero";
import Receive from "./pages/Receive";
import Public from "./pages/Public";
import Private from "./pages/Private";
import OnboardingPublic from "./pages/OnboardingPublic";
import OnboardingPrivate from "./pages/OnboardingPrivate";
import {
  useActiveWalletConnectionStatus,
  useActiveAccount,
} from "thirdweb/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";

import { connectWallet } from "./app/features/connectWalletSlice";
import { fetchOnBoardingData } from "./app/features/userOnbroadDataSlice";
import { fetchOnBoardingTxData } from "./app/features/userOnboardTxDataSlice";

import { Toaster } from "react-hot-toast";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={true}>
      <Routes location={location} key={location.pathname}>
        <Route path="/">
          <Route index element={<Hero />} />
          <Route path="/public" element={<Public />} />
          <Route path="/private" element={<Private />} />
          <Route path="/onboarding">
            <Route path="/onboarding/public" element={<OnboardingPublic />} />
            <Route path="/onboarding/private" element={<OnboardingPrivate />} />
          </Route>
        </Route>
        <Route path="/private/receive/:address" element={<Receive />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const dispatch = useAppDispatch();
  const connectionStatus = useActiveWalletConnectionStatus();
  const account = useActiveAccount();
  const publicOnBoardingData = useAppSelector(
    (state) => state.publicOnBoarding
  );

  const onboardingDataInitilizer = () => {
    if (account?.address) {
      dispatch(fetchOnBoardingData({ signer: account?.address }));
    }
  };

  useEffect(() => {
    if (!publicOnBoardingData.error && publicOnBoardingData.address) {
      console.log(publicOnBoardingData.address);
      dispatch(
        fetchOnBoardingTxData({ contract: publicOnBoardingData.address })
      );
    }
  }, [publicOnBoardingData]);

  useEffect(() => {
    console.log("connectionSta8yf7f7f7ftus", publicOnBoardingData);
    if (connectionStatus === "connected") {
      dispatch(connectWallet());
      onboardingDataInitilizer();
    } else {
      console.log("wallet not connected");
    }
  }, [connectionStatus]);

  // useEffect(() => {
  //   if (!publicOnBoardingData.error && publicOnBoardingData.address) {
  //     console.log(publicOnBoardingData.address);
  //     dispatch(
  //       fetchOnBoardingTxData({ contract: publicOnBoardingData.address })
  //     );
  //   }
  // }, [publicOnBoardingData]);

  return (
    <div className="w-screen h-screen">
      <Toaster />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;

// factory arbitrum sepolia: 0x3558C2D26A26D1aeAbA39503017137D8DEBb9337
// factory sepolia: 0x9769c95e46681a9BF9A6Bfa303bef1B04C636e1D

import { PublicAssetsReceivedCard } from "../components/PublicAssetsReceivedCard";
import { PublicAddressCard } from "../components/PublicAddressCard";
import { PrivateUrlCard } from "../components/PrivateUrlCard";
import { TransactionDataTable } from "../components/TransactionDataTable";
import { transactionHistoryType } from "../types/types";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { homePageTransitions } from "../transitions/transitions";
import { useAppSelector } from "../app/hooks";

// import { PageTransition } from "../components/PageTransition";

const Public = () => {
  const publicOnBoardingTxData = useAppSelector(
    (state) => state.publicOnBoardingTx
  );
  console.log(
    "publicOnBoardingTxData.publicTransactionHistory",
    publicOnBoardingTxData.publicTransactionHistory
  );

  // publicOnBoardingTxData.

  const headers = [
    "S. No.",
    "Sender",
    "Date",
    "Chain",
    "Asset",
    "Amount",
    "Txn Hash",
  ];

  const [direction, setDirection] = useState<"left" | "right">("left");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<transactionHistoryType[]>(
    []
  );

  useEffect(() => {
    setIsLoading(true);
    setTransactions(publicOnBoardingTxData.publicTransactionHistory || []);
    setIsLoading(false);
  }, [publicOnBoardingTxData]);

  return (
    <motion.div
      transition={{ duration: 0.5 }}
      key="public"
      initial="initial"
      animate="in"
      exit="out"
      variants={homePageTransitions}
      custom={direction}
    >
      <Header isPublic={true} setDirection={setDirection} />
      <div className="h-[calc(100vh-96px)] w-full">
        <div className="h-full w-full flex flex-col justify-start items-start py-6 px-24">
          <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-4">
            <PublicAssetsReceivedCard />
            <div className="grid grid-cols-1 grid-rows-2 gap-4">
              <PublicAddressCard />
              <PrivateUrlCard />
            </div>
            <div className="col-span-2">
              <TransactionDataTable
                headers={headers}
                transactions={transactions}
                isLoading={isLoading}
                isPrivate={false}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Public;

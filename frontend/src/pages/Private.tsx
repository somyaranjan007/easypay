import { PublicAddressCard } from "../components/PublicAddressCard";
import { PrivateUrlCard } from "../components/PrivateUrlCard";
import { TransactionDataTable } from "../components/TransactionDataTable";
import { PrivateAssetsReceivedCard } from "../components/PrivateAssetsReceivedCard";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ethers } from "ethers";
import { transactionHistoryType } from "../types/types";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { homePageTransitions } from "../transitions/transitions";
import { sepolia } from "thirdweb/chains";
import { Umbra } from "@umbracash/umbra-js";

const Private = () => {
  const headers = [
    "S. No.",
    "Sender",
    "Date",
    "Chain",
    "Asset",
    "Amount",
    "Txn Hash",
  ];
  const { provider, signer, stealthKeyRegistry } = useAppSelector(
    (state: RootState) => state.connectWallet
  );
  const [direction, setDirection] = useState<string>("right");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<transactionHistoryType[]>(
    JSON.parse(localStorage.getItem("scanPrivateData") || "[]")
  );

  useEffect(() => {
    window.addEventListener("storage", () => {
      setTransactions(
        JSON.parse(localStorage.getItem("scanPrivateData") || "[]")
      );
    });
    return () => {
      window.removeEventListener("storage", () => {});
    };
  }, []);

  const scan = async () => {
    setIsLoading(true);
    try {
      if (!provider) {
        throw Error("provider not found");
      } else if (!signer) {
        throw Error("signer not found");
      } else if (!stealthKeyRegistry) {
        throw Error("stealthKeyRegistry not found");
      } else {
        const umbra = new Umbra(provider, sepolia.id);
        const { spendingKeyPair, viewingKeyPair } =
          await umbra.generatePrivateKeys(signer);
        const spendingPublicKey = spendingKeyPair.publicKeyHex;
        const viewingPrivateKey = viewingKeyPair.privateKeyHex;

        if (viewingPrivateKey) {
          const { userAnnouncements } = await umbra.scan(
            spendingPublicKey,
            viewingPrivateKey
          );
          console.log("userAnnouncements: ", userAnnouncements);

          let existingObjects: transactionHistoryType[] = JSON.parse(
            localStorage.getItem("scanPrivateData") || "[]"
          );
          for (const tx of userAnnouncements) {
            const date = new Date(
              Number(tx.timestamp) * 1000
            ).toLocaleDateString("en-GB");
            const check = existingObjects.find(
              (obj) => obj.txnhash === tx.txHash
            );
            if (!check) {
              existingObjects.unshift({
                sender: tx.from,
                chain: (await provider.getNetwork()).name,
                date: date,
                asset:
                  tx.token === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
                    ? "NATIVE"
                    : "TOKEN",
                amount: ethers.utils.formatUnits(tx.amount.toBigInt(), 18),
                txnhash: tx.txHash,
                iswithdrawn: tx.isWithdrawn,
                randomnumber: tx.randomNumber,
                receiver: tx.receiver,
                token: tx.token,
                type: "private",
              });
            }
          }
          localStorage.setItem(
            "scanPrivateData",
            JSON.stringify(existingObjects)
          );
          window.dispatchEvent(new Event("storage"));
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      transition={{ duration: 0.5 }}
      key="private"
      initial="initial"
      animate="in"
      exit="out"
      variants={homePageTransitions}
      custom={direction}
    >
      <Header isPublic={false} setDirection={setDirection} />
      <div className="h-[calc(100vh-96px)] w-full">
        <div className="h-full w-full flex flex-col justify-start items-start py-6 px-24">
          <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-4">
            <PrivateAssetsReceivedCard />
            <div className="grid grid-cols-1 grid-rows-2 gap-4">
              <PublicAddressCard />
              <PrivateUrlCard />
            </div>
            <div className="col-span-2">
              <TransactionDataTable
                headers={headers}
                transactions={transactions}
                isPrivate={true}
                scan={scan}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Private;

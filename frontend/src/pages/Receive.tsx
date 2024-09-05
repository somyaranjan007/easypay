import { MakeTransactionCard } from "../components/MakeTransactionCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ethers } from "ethers";
import { ConnectWalletButton } from "../components/ConnectWalletButton";

import { useActiveAccount } from "thirdweb/react";
import { motion } from "framer-motion";
import { NextStepButton } from "../components/NextStepButton";
import { sepolia } from "thirdweb/chains";
import { Umbra } from "@umbracash/umbra-js";
import toast from "react-hot-toast";
import { getContract, sendAndConfirmTransaction } from "thirdweb";
import { prepareContractCall } from "thirdweb";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FaChevronDown } from "react-icons/fa";
import { setMainnet, setTestnet } from "../app/features/connectWalletSlice";

const Receive = () => {
  const [token, setToken] = useState<string>(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
  );
  const [amount, setAmount] = useState<string>("0");
  const { address } = useParams();
  const { provider, signer, stealthKeyRegistry } = useAppSelector(
    (state: RootState) => state.connectWallet
  );
  const { client } = useAppSelector((state) => state.thirdWeb);
  const account = useActiveAccount();
  const isTestnet = useAppSelector((state) => state.connectWallet.testnet);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const wallet = useAppSelector((state) => state.connectWallet);
  console.log(wallet);

  const send = async () => {
    try {
      if (!provider) {
        throw Error("provider not found");
      } else if (!signer) {
        throw Error("signer not found");
      } else if (!stealthKeyRegistry) {
        throw Error("stealthKeyRegistry not found");
      } else if (!amount) {
        throw Error("amount not found");
      } else if (!token) {
        throw Error("token not found");
      } else if (!address) {
        throw Error("address not found");
      } else {
        console.log("address", address);
        const umbra = new Umbra(provider, sepolia.id);
        let parsedAmount;
        if (token === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
          parsedAmount = ethers.utils.parseUnits(amount, 18);
        } else {
          parsedAmount = ethers.utils.parseUnits(amount, 6);
          const tokenContract = await getContract({
            address: token,
            chain: sepolia,
            client: client,
          });

          const tx = prepareContractCall({
            contract: tokenContract,
            method:
              "function approve(address spender, uint256 value) external returns (bool)",
            params: [
              "0xFb2dc580Eed955B528407b4d36FfaFe3da685401",
              parsedAmount.toBigInt(),
            ],
            gas: BigInt(1000000),
          });

          if (!account) {
            throw Error("account not found");
          }

          const result = await sendAndConfirmTransaction({
            transaction: tx,
            account: account,
          });

          if (result?.status === "success") {
            toast.success("Allowance approved");
          } else {
            toast.error("Something went wrong");
            throw Error("Allowance not approved");
          }
        }
        const result = await umbra.send(signer, token, parsedAmount, address, {
          gasLimit: 1000000,
        });
        console.log("result", result);
        toast.success("Transaction sent");
      }
    } catch (error: any) {
      toast.error(error.message.split(" (")[0]);
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleMakeTransaction = () => {
    setIsLoading(true);
    console.log("gwcaiugiuweadcgso");
    send().then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="h-full w-full flex flex-col justify-evenly items-center">
      <div className="w-full flex justify-between items-center px-10">
        <Menu
          allowHover
          open={isMenuOpen}
          handler={() => setIsMenuOpen((prev) => !prev)}
        >
          <MenuHandler>
            <Button
              className="h-[60px] w-[180px] flex justify-center items-center gap-2 border-[0.1px] border-gray-400"
              variant="outlined"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <img
                src={isTestnet ? "/testnet-icon.svg" : "/mainnet-icon.svg"}
                alt={isTestnet ? "testnet-icon" : "mainnet-icon"}
                className="w-6 h-6"
              />
              <div className="text-lg font-normal">
                {isTestnet ? "Testnet" : "Mainnet"}
              </div>
              <FaChevronDown size={15} />
            </Button>
          </MenuHandler>
          <MenuList
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <MenuItem
              onClick={() => {
                dispatch(setMainnet());
              }}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Mainnet
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(setTestnet());
              }}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Testnet
            </MenuItem>
          </MenuList>
        </Menu>
        <ConnectWalletButton />
      </div>

      <div className="h-20" />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MakeTransactionCard
          amount={amount}
          token={token}
          setAmount={setAmount}
          setToken={setToken}
        />
      </motion.div>
      <NextStepButton
        handleNextStep={handleMakeTransaction}
        isLoading={isLoading}
        label="Make Transaction"
      />
    </div>
  );
};

export default Receive;

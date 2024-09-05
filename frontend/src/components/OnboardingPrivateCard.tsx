import {
  Card,
  Typography,
  Button,
  Step,
  Stepper,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaSignature } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import { motion } from "framer-motion";

import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ConnectWalletButton } from "./ConnectWalletButton";
import toast from "react-hot-toast";
import { Umbra } from "@umbracash/umbra-js";
import { sepolia } from "thirdweb/chains";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";

export const OnboardingPrivateCard = ({
  isLastStep,
  setIsLastStep,
}: {
  isLastStep: boolean;
  setIsLastStep: (value: boolean) => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();

  const [spendingKey, setSpendingKey] = useState<string | null>(null);
  const [viewingKey, setViewingKey] = useState<string | null>(null);

  const { provider, signer, stealthKeyRegistry } = useAppSelector(
    (state: RootState) => state.connectWallet
  );

  const sign = async () => {
    try {
      if (!provider) {
        throw Error("provider not found");
      } else if (!signer) {
        throw Error("signer not found");
      } else if (!stealthKeyRegistry) {
        throw Error("stealthKeyRegistry not found");
      } else {
        if (!activeChain) {
          throw Error("Wallet not connected");
        } else if (activeChain?.id !== sepolia.id) {
          setTimeout(async () => {
            await switchChain(sepolia);
            location.reload();
          }, 1500);
          throw Error("Please change chain to Sepolia");
        }
        const umbra = new Umbra(provider, sepolia.id);
        const { spendingKeyPair, viewingKeyPair } =
          await umbra.generatePrivateKeys(signer);
        setSpendingKey(spendingKeyPair.publicKeyHex);
        setViewingKey(viewingKeyPair.publicKeyHex);
      }

      toast.success("Signature successful");
    } catch (error: any) {
      toast.error(error?.message ?? "Something went wrong");
      throw error;
    }
  };

  const sendTransaction = async () => {
    if (!provider) {
      throw Error("provider not found");
    } else if (!signer) {
      throw Error("signer not found");
    } else if (!stealthKeyRegistry) {
      throw Error("stealthKeyRegistry not found");
    } else if (!spendingKey) {
      throw Error("spendingKey not found");
    } else if (!viewingKey) {
      throw Error("viewingKey not found");
    } else {
      try {
        await stealthKeyRegistry.setStealthKeys(
          spendingKey,
          viewingKey,
          signer
        );
        toast.success("Transaction successful");
      } catch (error: any) {
        toast.error(error?.message ?? "Something went wrong");
        throw error;
      }
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setIsLoading(true);
      (activeStep === 0 ? sign : sendTransaction)()
        .then(() => {
          setActiveStep((cur) => cur + 1);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="w-[810px] h-[540px] shadow-2xl border-[1px] border-app-gray bg-private-gradient bg-cover p-8"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="hidden">
          <ConnectWalletButton />
        </div>
        <div className="absolute top-0 right-0 -translate-y-[150px] z-0">
          <motion.div
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 0.2,
            }}
            initial={{ opacity: 0, y: 50, rotate: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
              },
            }}
            exit={{
              opacity: 0,
              y: -50,
              rotate: 10,
              transition: { duration: 0.5 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            <motion.img
              src="/private-model.png"
              alt="private-model"
              className="h-[455px] w-[320px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </motion.div>
        </div>
        <div className="h-[620px] w-[200px] flex flex-col justify-end items-start pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              color="black"
              className="text-6xl leading-[1.15]"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Private Profile...
            </Typography>
          </motion.div>
        </div>
        <Card
          className="w-full h-full py-5 px-10 flex flex-col justify-between items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Stepper
            className="w-[500px]"
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {[
              { icon: FaSignature, label: "Signature" },
              { icon: GrTransaction, label: "Transaction" },
              { icon: MdDone, label: "Completed" },
            ].map((step, index) => (
              <Step
                key={index}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <step.icon className="h-5 w-5" />
                <div className="absolute -bottom-[3.5rem] w-max text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <Typography
                      variant="h6"
                      color={activeStep === index ? "blue-gray" : "gray"}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Step {index + 1}
                    </Typography>
                    <Typography
                      color={activeStep === index ? "blue-gray" : "gray"}
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {step.label}
                    </Typography>
                  </motion.div>
                </div>
              </Step>
            ))}
          </Stepper>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-48"
              size="lg"
              onClick={handleNext}
              disabled={isLastStep || isLoading}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {isLoading ? (
                <div className="h-full w-full flex justify-center items-center">
                  <Spinner
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              ) : (
                "Sign"
              )}
            </Button>
          </motion.div>
        </Card>
      </Card>
    </motion.div>
  );
};

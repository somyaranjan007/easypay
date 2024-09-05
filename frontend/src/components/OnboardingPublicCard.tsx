import {
  Card,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";

import { motion } from "framer-motion";
import {
  // arbitrumSepolia,
  Chain,
  sepolia,
} from "thirdweb/chains";

export const OnboardingPublicCard = ({
  address,
  chain,
  token,
  setChain,
  setToken,
}: {
  address: string;
  chain: Chain;
  token: string;
  setChain: (chain: Chain) => void;
  setToken: (token: string) => void;
}) => {
  const chains = [
    sepolia,
    // arbitrumSepolia
  ];
  const tokens = {
    [sepolia.id]: [
      { address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", name: "sETH" },
      { address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", name: "sUSDC" },
      { address: "0x27CEA6Eb8a21Aae05Eb29C91c5CA10592892F584", name: "sUSDT" },
    ],
    // [arbitrumSepolia.id]: [
    //   { address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", name: "sETH" },
    //   { address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d", name: "sUSDC" },
    // ],
  };

  const [errors, setErrors] = useState({
    chain: false,
    token: false,
    address: false,
  });

  const validateInput = (field: string, value: string) => {
    // Add your validation logic here
    setErrors((prev) => ({ ...prev, [field]: value.length === 0 }));
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="w-[810px] h-[540px] shadow-2xl border-[1px] border-app-gray bg-public-gradient bg-cover p-8"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="relative">
          <div className="absolute top-0 right-0 -translate-y-[180px] -translate-x-[10px]">
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
                rotate: 5,
                transition: { duration: 0.3 },
              }}
            >
              <motion.img
                src="/public-model.png"
                alt="public-model"
                className="h-[470px] w-[300px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ rotate: 5 }}
              />
            </motion.div>
          </div>
        </div>
        <div className="h-[700px] w-[275px] flex flex-col justify-end items-center pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h1"
              color="black"
              className="text-6xl leading-[1.15]"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Public Profile...
            </Typography>
          </motion.div>
        </div>
        <Card
          className="w-full h-full"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex-1 grid grid-cols-2 grid-rows-2 justify-center items-center gap-x-5 gap-y-2 p-5">
            <motion.div
              className="flex flex-col justify-center items-start gap-1"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-lg font-bold">Select Chain</div>
              <motion.div
                className="w-full"
                animate={errors.chain ? shakeAnimation : {}}
              >
                <Select
                  value={chain.id.toString()}
                  labelProps={{
                    className: "hidden",
                  }}
                  className="!border-app-gray"
                  onChange={(chainId) => {
                    if (chainId) {
                      setChain(chains.find((c) => c.id === Number(chainId))!);
                      setToken(tokens[chain.id][0].address);
                      validateInput("chain", chainId);
                    }
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  placeholder={undefined}
                >
                  {chains.map((chain) => (
                    <Option key={chain.id} value={chain.id.toString()}>
                      {chain.name}
                    </Option>
                  ))}
                </Select>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex flex-col justify-center items-start gap-1"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-lg font-bold">Select Token</div>
              <motion.div
                className="w-full"
                animate={errors.token ? shakeAnimation : {}}
              >
                <Select
                  value={token}
                  placeholder="Select Token"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="!border-app-gray"
                  onChange={(token) => {
                    if (token) {
                      setToken(token || "");
                      validateInput("token", token);
                    }
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {tokens[chain.id].map((token) => (
                    <Option key={token.address} value={token.address}>
                      {token.name}
                    </Option>
                  ))}
                </Select>
              </motion.div>
            </motion.div>
            <motion.div
              className="col-span-2 flex flex-col justify-center items-start gap-1"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-lg font-bold">Account Address</div>
              <motion.div
                className="w-full"
                animate={errors.address ? shakeAnimation : {}}
              >
                <Input
                  type="text"
                  value={address}
                  labelProps={{
                    className: "hidden",
                  }}
                  disabled
                  className="!border-app-gray"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </Card>
    </motion.div>
  );
};

import { Card, Input, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

export const MakeTransactionCard = ({
  amount,
  token,
  setAmount,
  setToken,
}: {
  amount: string;
  token: string;
  setAmount: (e: string) => void;
  setToken: (e: string) => void;
}) => {
  const tokens = {
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    USDC: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    USDT: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
  };
  const [errors, setErrors] = useState({ token: false, amount: false });

  const tokenControls = useAnimation();
  const amountControls = useAnimation();

  const validateInput = (type: "token" | "amount") => {
    if (type === "token" && token.trim() === "") {
      setErrors((prev) => ({ ...prev, token: true }));
      tokenControls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.5 },
      });
    } else if (
      type === "amount" &&
      (isNaN(Number(amount)) || Number(amount) <= 0)
    ) {
      setErrors((prev) => ({ ...prev, amount: true }));
      amountControls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.5 },
      });
    } else {
      setErrors((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <Card
      className="h-[495px] w-[810px] shadow-2xl border-[1px] border-app-gray bg-private-gradient bg-cover p-8"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="absolute top-0 right-0 -translate-y-[185px] -translate-x-[5px]">
            <motion.img
              src="/transaction-model.png"
              alt="transaction-model"
              className="h-[420px] w-[400px]"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, rotate: 5 }}
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="h-[232px] w-36 text-6xl font-bold text-white flex flex-col justify-end pb-8">
            Make Transaction
          </div>
        </motion.div>
      </motion.div>
      <Card
        className="h-full w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex-1 grid grid-cols-2 justify-center items-center p-8 gap-8">
          <motion.div
            className="flex flex-col justify-center items-start"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-xl font-bold">Amount</div>
            <motion.div className="w-full" animate={amountControls}>
              <Input
                type="number"
                value={amount}
                labelProps={{
                  className: "hidden",
                }}
                className={` !border-app-gray ${
                  errors.amount ? "border-red-500" : ""
                }`}
                onChange={(e) => setAmount(e.target.value)}
                onBlur={() => validateInput("amount")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center items-start"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-xl font-bold">Token</div>
            <motion.div className="w-full" animate={tokenControls}>
              <Select
                value={token}
                labelProps={{
                  className: "hidden",
                }}
                className={`!border-app-gray ${
                  errors.token ? "border-red-500" : ""
                }`}
                onChange={(token) => {
                  console.log(token);
                  return setToken(token || "");
                }}
                onBlur={() => validateInput("token")}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                placeholder={undefined}
              >
                {Object.keys(tokens).map((token, index) => (
                  <Option
                    key={index}
                    value={tokens[token as keyof typeof tokens]}
                  >
                    {token}
                  </Option>
                ))}
              </Select>
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </Card>
  );
};

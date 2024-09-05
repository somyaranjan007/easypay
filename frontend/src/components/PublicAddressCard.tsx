import { Card, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import { motion } from "framer-motion";
import { useAppSelector } from "../app/hooks";

export const PublicAddressCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(publicOnBoarding?.address || "");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const publicOnBoarding = useAppSelector((state) => state.publicOnBoarding);

  return (
    <Card
      className="w-full h-full flex flex-col justify-between shadow-2xl border-[1px] border-app-gray p-5"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="flex flex-col justify-start items-start gap-1">
        <div className="text-2xl font-semibold">Public Address</div>
        <div className="w-5/6 flex items-center gap-1">
          <div className="text-xl text-black font-light truncate">
            {publicOnBoarding?.address}
          </div>
          <IconButton
            variant="text"
            color="gray"
            size="sm"
            onClick={handleCopy}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {copied ? <TbCopyCheck size={20} /> : <TbCopy size={20} />}
          </IconButton>
        </div>
      </div>
      <div className="flex gap-1">
        <motion.div
          className="h-5 bg-app-yellow rounded-md"
          initial={{ width: 0 }}
          animate={{ width: "33.33%" }}
          transition={{ duration: 0.5, delay: 0.25 }}
        />
        <motion.div
          className="h-5 bg-app-red rounded-md"
          initial={{ width: 0 }}
          animate={{ width: "66.67%" }}
          transition={{ duration: 0.5, delay: 0.25 }}
        />
      </div>
    </Card>
  );
};

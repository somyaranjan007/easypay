import { Card, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { TbCopyCheck, TbCopy } from "react-icons/tb";
import { useActiveAccount } from "thirdweb/react";
import { motion } from "framer-motion";

export const PrivateUrlCard = () => {
  const account = useActiveAccount();
  const [copied, setCopied] = useState(false);

  const url =
    location.href.split("/").slice(0, -1).join("/") +
    "/private/receive/" +
    account?.address;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card
      className="w-full h-full flex flex-col justify-between shadow-2xl border-[1px] border-app-gray p-5"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="flex flex-col justify-start items-start gap-1">
        <div className="text-2xl font-semibold">Private URL</div>
        <div className="w-5/6 flex items-center gap-1">
          <div className="text-xl text-black font-light truncate">{url}</div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
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
          </motion.div>
        </div>
      </div>
      <div className="flex gap-1">
        <motion.div
          className="h-5 w-4/6 bg-app-light-blue rounded-md"
          initial={{ width: 0 }}
          animate={{ width: "66.67%" }}
          transition={{ duration: 0.5, delay: 0.25 }}
        />
        <motion.div
          className="h-5 w-2/6 bg-app-blue rounded-md"
          initial={{ width: 0 }}
          animate={{ width: "33.33%" }}
          transition={{ duration: 0.5, delay: 0.25 }}
        />
      </div>
    </Card>
  );
};
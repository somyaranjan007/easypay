import { Card, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

export const PublicAssetsReceivedCard = () => {
  return (
    <Card
      className="w-full h-full shadow-2xl border-[1px] border-app-gray bg-public-gradient bg-cover p-8"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="relative">
        <div className="absolute top-0 right-0 -translate-y-[150px] -translate-x-[25px]">
          <motion.div
            key="public-assets-received-image"
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 0.2
            }}
            initial={{ opacity: 0, y: 50, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -50, 
              rotate: 10,
              transition: { duration: 0.5 }
            }}
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.3 }
            }}
          >
            <motion.img
              src="/public-model.png"
              alt="public-model"
              className="h-[330px] w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ rotate: 5 }}
            />
          </motion.div>
        </div>
      </div>
      <div className="h-[360px] w-[275px] flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            color="black"
            className="text-5xl leading-[1.15]"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Public Assets Received
          </Typography>
        </motion.div>
      </div>
      <Card
        className="w-full h-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex-1 flex justify-between items-center pl-12 pr-40">
          <div className="flex flex-col justify-center items-center gap-2 text-black">
            <div className="text-base flex flex-col justify-center items-start">
              Public
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="text-5xl font-semibold">$70k</div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 text-black">
            <div className="text-base flex flex-col justify-center items-start">
              Total
              <div className="text-5xl font-semibold">$150k</div>
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
};
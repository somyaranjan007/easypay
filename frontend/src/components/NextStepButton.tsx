import { Button, Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";

export const NextStepButton = ({
  label = "Next Step",
  disabled = false,
  handleNextStep,
  isLoading,
}: {
  label?: string;
  disabled?: boolean;
  handleNextStep: () => void;
  isLoading: boolean;
}) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Button
        className="w-72 rounded-full bg-gray-400 text-lg text-black font-thin normal-case py-2"
        size="lg"
        onClick={handleNextStep}
        disabled={isLoading || disabled}
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
          <div className="flex justify-center items-center gap-1 translate-x-[15px]">
            {label}
            <IoIosArrowRoundForward size={30} />
          </div>
        )}
      </Button>
    </motion.div>
  );
};

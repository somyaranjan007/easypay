import { OnboardingPrivateCard } from "../components/OnboardingPrivateCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NextStepButton } from "../components/NextStepButton";
import toast from "react-hot-toast";

const OnboardingPrivate = () => {
  const [isLastStep, setIsLastStep] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    setIsLoading(true);
    toast.success("Private profile setup successful");
    setTimeout(() => {
      setIsLoading(false);
      navigate("/public", { replace: true });
    }, 2000);
  };

  return (
    <div className="h-full w-full flex flex-col justify-evenly items-center">
      <div className="h-20" />
      <OnboardingPrivateCard
        isLastStep={isLastStep}
        setIsLastStep={setIsLastStep}
      />
      <NextStepButton
        handleNextStep={handleNextStep}
        isLoading={isLoading}
        disabled={!isLastStep}
      />
    </div>
  );
};

export default OnboardingPrivate;

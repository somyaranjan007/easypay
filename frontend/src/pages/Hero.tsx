import { useState } from "react";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { useActiveAccount } from "thirdweb/react";
import { useAppSelector } from "../app/hooks";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Hero = () => {
  const account = useActiveAccount();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const publicOnBoardingData = useAppSelector(
    (state) => state.publicOnBoarding
  );

  console.log(publicOnBoardingData);

  const launchApp = () => {
    if (!account) {
      toast.error("Please connect your wallet to launch the app");
      return;
    }
    setLoading(true);
    if (!publicOnBoardingData.error) {
      navigate("/public");
    } else {
      navigate("/onboarding/public");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="h-24 fixed top-0 left-0 right-0 w-full flex justify-between items-center px-10 bg-white bg-opacity-70 backdrop-blur-md z-10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        <Typography
          variant="h1"
          color="black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Easypay
        </Typography>
        <div className="flex items-center gap-4">
          <Button
            variant="outlined"
            color="white"
            className="w-72 !bg-app-gradient rounded-full text-black font-normal"
            size="lg"
            disabled={loading}
            onClick={launchApp}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner
                  className="w-4 h-4"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                Launching app
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Launch app
              </div>
            )}
          </Button>
          <ConnectWalletButton />
        </div>
      </motion.div>
      <motion.div
        className="snap-y snap-mandatory overflow-y-scroll overflow-x-hidden h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <motion.section
          className="snap-center snap-always"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ amount: 0.3 }}
        >
          <div className="h-screen flex items-center justify-between">
            <motion.div
              className="flex-1 flex justify-center items-center"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ amount: 0.3 }}
            >
              <div className="flex flex-col justify-center items-start gap-4">
                <Typography
                  variant="h2"
                  color="black"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Public Asset Management
                </Typography>
                <Typography
                  variant="paragraph"
                  color="black"
                  className="w-[600px]"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Securely manage and track your public assets with our advanced
                  blockchain solution. Enjoy transparent transactions, real-time
                  updates, and seamless integration across multiple chains. Our
                  system seamlessly integrates with multiple blockchain
                  networks, allowing you to manage assets across different
                  chains from a single interface. Real-time updates ensure you
                  always have the most up-to-date information about your
                  holdings. Transparency is key, with clear audit trails and
                  increased trust in transactions. Our intuitive design makes it
                  easy for both novice and experienced users to navigate and
                  manage their public assets effectively. Robust security
                  protocols are in place to protect your public assets, even
                  though they are visible on the blockchain.
                </Typography>
              </div>
            </motion.div>
            <motion.img
              src="/app-public-model.png"
              alt="hero"
              className="h-[800px] w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ amount: 0.3 }}
            />
          </div>
        </motion.section>
        <motion.section
          className="snap-center snap-always"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ amount: 0.3 }}
        >
          <div className="h-screen flex items-center justify-between">
            <motion.img
              src="/app-private-model.png"
              alt="hero"
              className="h-[700px] w-auto"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ amount: 0.3 }}
            />
            <motion.div
              className="flex-1 flex justify-center items-center"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ amount: 0.3 }}
            >
              <div className="flex flex-col justify-center items-start gap-4">
                <Typography
                  variant="h2"
                  color="black"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Private Asset Management
                </Typography>
                <Typography
                  variant="paragraph"
                  color="black"
                  className="w-[600px]"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Protect your financial privacy with our cutting-edge private
                  asset management system. Utilize stealth addresses and
                  encrypted transactions to keep your assets confidential and
                  secure. Our private asset management feature maintains a
                  balance between user privacy and regulatory compliance,
                  addressing potential concerns about illicit activities. You
                  have full control over your financial privacy, allowing you to
                  choose when and how to disclose your asset information.
                  Seamlessly switch between managing your public and private
                  assets, providing a comprehensive financial management
                  experience.
                </Typography>
              </div>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          className="snap-center snap-always"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ amount: 0.3 }}
        >
          <div className="h-screen flex items-center justify-between">
            <motion.div
              className="flex-1 flex justify-center items-center"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ amount: 0.3 }}
            >
              <div className="flex flex-col justify-center items-start gap-4">
                <Typography
                  variant="h2"
                  color="black"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Private Transactions
                </Typography>
                <Typography
                  variant="paragraph"
                  color="black"
                  className="w-[600px]"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Experience truly private transactions with our
                  state-of-the-art technology. Send and receive assets
                  anonymously, maintaining complete control over your financial
                  information and activity. Our advanced cryptographic
                  techniques, such as zero-knowledge proofs or ring signatures,
                  ensure transaction privacy. The system maintains user
                  anonymity throughout the transaction process, from initiation
                  to completion. Conduct private transactions across different
                  blockchain networks, expanding the scope of financial privacy.
                  You can selectively reveal transaction details for auditing
                  purposes when necessary, maintaining a balance between privacy
                  and accountability. The process of conducting private
                  transactions is seamless and user-friendly, making advanced
                  privacy features accessible to all users.
                </Typography>
              </div>
            </motion.div>
            <motion.img
              src="/app-transaction-model.png"
              alt="hero"
              className="h-[700px] w-auto"
              initial={{ opacity: 0, scale: 1.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ amount: 0.3 }}
            />
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default Hero;

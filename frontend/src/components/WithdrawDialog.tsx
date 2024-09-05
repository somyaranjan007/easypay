import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

import { transactionHistoryType } from "../types/types";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { Umbra } from "@umbracash/umbra-js";
import { sepolia } from "thirdweb/chains";
import toast from "react-hot-toast";
import { useActiveWalletChain } from "thirdweb/react";

const WithdrawDialog = ({
  open,
  handleClose,
  transaction,
}: {
  open: boolean;
  handleClose: () => void;
  transaction: transactionHistoryType;
}) => {
  const [address, setAddress] = useState("");
  const activeChain = useActiveWalletChain();

  const { provider, signer, stealthKeyRegistry } = useAppSelector(
    (state: RootState) => state.connectWallet
  );

  // const handleWithdraw = () => {
  //   // console.log("Withdraw", transaction, "to:", address);
  //   handleClose();
  // };

  const handleWithdraw = async () => {
    handleClose();
    try {
      if (!provider) {
        throw Error("provider not found");
      } else if (!signer) {
        throw Error("signer not found");
      } else if (!stealthKeyRegistry) {
        throw Error("stealthKeyRegistry not found");
      } else {
        if (transaction.type !== "private") {
          throw Error("Only private transactions can be withdrawn");
        }
        const umbra = new Umbra(provider, sepolia.id);
        const { spendingKeyPair } = await umbra.generatePrivateKeys(signer);
        const stealthKeyPair = spendingKeyPair.mulPrivateKey(
          transaction.randomnumber!
        );
        const stealthPrivateKey = stealthKeyPair.privateKeyHex;
        if (!stealthPrivateKey) {
          throw Error("stealthPrivateKey not found");
        }
        console.log(stealthKeyPair.address);

        if (
          transaction.token === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        ) {
          await umbra.withdraw(stealthPrivateKey, transaction.token, address);
        } else {
          const sponsor = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
          const sponsorFee = "0";

          if (!activeChain) {
            throw Error("activeChain not found");
          }

          const { v, r, s } = await Umbra.signWithdraw(
            stealthPrivateKey,
            activeChain.id,
            umbra.chainConfig.umbraAddress,
            address,
            transaction.token!,
            sponsor,
            sponsorFee
          );

          const tx = await umbra.withdrawOnBehalf(
            signer,
            stealthKeyPair.address,
            address,
            transaction.token!,
            sponsor,
            sponsorFee,
            v,
            r,
            s
          );
          console.log(tx);
          const result = await tx.wait();
          console.log(result);
        }

        let existingObjects: transactionHistoryType[] = JSON.parse(
          localStorage.getItem("scanPrivateData") || "[]"
        );
        const findTx = existingObjects.find(
          (obj) => obj.randomnumber === transaction.randomnumber
        );
        if (findTx) {
          findTx.iswithdrawn = true;
        }
        localStorage.setItem(
          "scanPrivateData",
          JSON.stringify(existingObjects)
        );
        window.dispatchEvent(new Event("storage"));
      }
      toast.success("Withdrawal successful");
    } catch (error) {
      console.log(error);
      toast.error("Withdrawal failed");
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <DialogHeader
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Withdraw Funds
      </DialogHeader>
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="lead"
          color="black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Enter the address to withdraw the funds to:
        </Typography>
        <Input
          value={address}
          labelProps={{
            className: "hidden",
          }}
          className="!border-app-gray"
          onChange={(e) => setAddress(e.target.value)}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
      </DialogBody>
      <DialogFooter
        className="w-full grid grid-cols-4 justify-center items-center gap-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="col-span-2" />
        <Button
          onClick={handleClose}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Cancel
        </Button>
        <Button
          onClick={handleWithdraw}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Withdraw
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default WithdrawDialog;

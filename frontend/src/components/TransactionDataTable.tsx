import { Typography, Button, Card, Spinner } from "@material-tailwind/react";
import WithdrawDialog from "./WithdrawDialog";
import { useState } from "react";
import { transactionHistoryType } from "../types/types";
import { motion } from "framer-motion";
import { LuRadar } from "react-icons/lu";

export const TransactionDataTable = ({
  headers,
  transactions,
  isPrivate,
  isLoading,
  scan,
}: {
  headers: string[];
  transactions: transactionHistoryType[];
  isPrivate: boolean;
  scan?: (() => void) | undefined;
  isLoading: boolean;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<transactionHistoryType | null>(null);

  const handleOpenDialog = (transaction: transactionHistoryType) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTransaction(null);
  };

  return (
    <motion.div
      className="h-full w-full"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="w-full h-full flex flex-col justify-between shadow-2xl border-[1px] border-app-gray p-5 overflow-y-auto"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {openDialog && selectedTransaction && (
          <WithdrawDialog
            open={openDialog}
            handleClose={handleCloseDialog}
            transaction={selectedTransaction}
          />
        )}
        <table className="h-full w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {headers.map((head) => (
                <th
                  key={head}
                  className="p-4 text-center border-b-[1px] border-app-gray"
                >
                  <div
                    className={`text-2xl text-bold ${
                      isPrivate ? "text-app-brown" : "text-app-blue"
                    } leading-none opacity-70`}
                  >
                    {head}
                  </div>
                </th>
              ))}
              {isPrivate && scan && (
                <th className="p-4 text-center border-b-[1px] border-app-gray">
                  <Button
                    variant="outlined"
                    color="brown"
                    onClick={scan}
                    className="w-full text-sm py-2 mx-0 flex items-center justify-center gap-2 font-medium normal-case transition-all duration-300 hover:scale-105 group"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <LuRadar
                      color="brown"
                      size={20}
                      className="group-hover:animate-spin"
                    />
                    Scan
                  </Button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
                <Spinner
                  className="w-10 h-10 animate-spin"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
            ) : (
              transactions.map((transaction, index) => {
                return (
                  <tr key={index} className="h-20">
                    <td className="p-4 text-center">{index + 1}</td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="black"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {transaction.sender &&
                          transaction.sender.slice(0, isPrivate ? 6 : 12)}
                        ...
                        {transaction.sender &&
                          transaction.sender.slice(-(isPrivate ? 6 : 12))}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="black"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {transaction.date}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="black"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {transaction.chain}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="black"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {transaction.asset}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="black"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {transaction.amount}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="black"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {transaction.txnhash &&
                          transaction.txnhash.slice(0, isPrivate ? 8 : 16)}
                        ...
                        {transaction.txnhash &&
                          transaction.txnhash.slice(-(isPrivate ? 8 : 16))}
                      </Typography>
                    </td>
                    {isPrivate && (
                      <td className="p-4 text-center">
                        {(transaction as transactionHistoryType).iswithdrawn ? (
                          <Button
                            variant="gradient"
                            size="sm"
                            color="green"
                            className="w-full text-sm py-2 mx-0 font-medium normal-case transition-all duration-300 hover:scale-105 hover:bg-brown-600"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            Withdrawn
                          </Button>
                        ) : (
                          <Button
                            variant="gradient"
                            size="sm"
                            color="brown"
                            className="w-full text-sm py-2 mx-0 font-medium normal-case transition-all duration-300 hover:scale-105 hover:bg-brown-600"
                            onClick={() =>
                              handleOpenDialog(
                                transaction as transactionHistoryType
                              )
                            }
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            Withdraw
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
            <div className="flex-1" />
          </tbody>
        </table>
      </Card>
    </motion.div>
  );
};

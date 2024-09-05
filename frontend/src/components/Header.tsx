import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMainnet, setTestnet } from "../app/features/connectWalletSlice";
import { useState } from "react";

export const Header = ({
  isPublic,
  setDirection,
}: {
  isPublic: boolean;
  setDirection: (direction: "left" | "right") => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isTestnet = useAppSelector((state) => state.connectWallet.testnet);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (direction: "left" | "right") => {
    const path = isPublic ? "/private" : "/public";
    navigate(path);
    setDirection(direction);
  };

  return (
    <div className="h-24 w-full flex justify-between items-center px-10">
      <div className="flex justify-center items-center">
        <div className="text-4xl font-medium mr-5">
          {isPublic ? "Public" : "Private"}
        </div>
        <FaChevronLeft
          size={30}
          onClick={() => {
            console.log("left");
            return handleNavigation("left");
          }}
          className="mx-2 cursor-pointer"
        />
        <FaChevronRight
          size={30}
          onClick={() => {
            console.log("right");
            return handleNavigation("right");
          }}
          className="mx-2 cursor-pointer"
        />
      </div>
      <div className="flex justify-center items-center gap-4">
        <Menu
          allowHover
          open={isMenuOpen}
          handler={() => setIsMenuOpen((prev) => !prev)}
        >
          <MenuHandler>
            <Button
              className="h-[60px] w-[180px] flex justify-center items-center gap-2 border-[0.1px] border-gray-400"
              variant="outlined"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <img
                src={isTestnet ? "/testnet-icon.svg" : "/mainnet-icon.svg"}
                alt={isTestnet ? "testnet-icon" : "mainnet-icon"}
                className="w-6 h-6"
              />
              <div className="text-lg font-normal">
                {isTestnet ? "Testnet" : "Mainnet"}
              </div>
              <FaChevronDown size={15} />
            </Button>
          </MenuHandler>
          <MenuList
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <MenuItem
              onClick={() => {
                dispatch(setMainnet());
              }}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Mainnet
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(setTestnet());
              }}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Testnet
            </MenuItem>
          </MenuList>
        </Menu>
        <ConnectWalletButton />
      </div>
    </div>
  );
};

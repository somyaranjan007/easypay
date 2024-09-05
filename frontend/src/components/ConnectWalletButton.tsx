import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { ConnectButton } from "thirdweb/react";
import { arbitrumSepolia, sepolia } from "thirdweb/chains";

export const ConnectWalletButton = () => {
  const { client } = useAppSelector((state: RootState) => state.thirdWeb);
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
  ];

  return (
    <ConnectButton
      client={client}
      chains={[arbitrumSepolia, sepolia]}
      wallets={wallets}
      theme={"light"}
      connectModal={{ size: "wide" }}
    />
  );
};

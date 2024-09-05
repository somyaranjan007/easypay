import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AssetReceiverFactoryModule = buildModule(
  "AssetReceiverFactoryModule",
  (m) => {
    const assetReceiverFactory = m.contract("AssetReceiverFactory", [], {});

    // const assetReceiver = m.call(assetReceiverFactory, "deploy", [
    //   "0x0000000000000000000000000000000000000000000000000000000000000002",
    //   "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    //   "11155111",
    // ]);
    // console.log(assetReceiver);

    console.log(assetReceiverFactory);
    return { assetReceiverFactory };
  }
);

export default AssetReceiverFactoryModule;

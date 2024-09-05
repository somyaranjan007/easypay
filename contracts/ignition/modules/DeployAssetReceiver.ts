import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const DeployAssetReceiverModule = buildModule("DeployAssetReceiverModule", (m) => {

  const assetReceiverFactory = m.contract("AssetReceiverFactory", [], {});
  console.log(assetReceiverFactory);

  return { assetReceiverFactory };
});

export default DeployAssetReceiverModule;

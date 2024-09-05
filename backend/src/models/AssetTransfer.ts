import { Schema, model, models } from "mongoose";

interface AssetTransferInterface {
  from: string;
  to: string;
  rawAmount: string;
  token: string;
  transactionHash: string;
  symbol: string;
  decimals: number;
  amount: number;
  chain: string;
  dstChain: string;
  dstAddress: string;
  dstToken: string;
  timestamp: string;
  native: boolean;
  network: "mainnet" | "testnet";
}

const assetTransferSchema = new Schema<AssetTransferInterface>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  rawAmount: { type: String, required: true },
  token: { type: String, required: true },
  transactionHash: { type: String, required: true },
  symbol: { type: String, required: true },
  decimals: { type: Number, required: true },
  amount: { type: Number, required: true },
  chain: { type: String, required: true },
  dstChain: { type: String, required: true },
  dstAddress: { type: String, required: true },
  dstToken: { type: String, required: true },
  timestamp: { type: String, required: true },
  native: { type: Boolean, required: true },
  network: { type: String, required: true }
});

const AssetTransfer = models.AssetTransfer || model<AssetTransferInterface>('AssetTransfer', assetTransferSchema);


export { AssetTransfer, AssetTransferInterface }
import { Schema, model, models } from "mongoose";

interface AssetReceiverInterface {
    address: string;
    createdAt: Date;
    owner: string;
    chainId: string;
    token: string;
}
// 2. Create a Schema corresponding to the document interface.
const assetReceiverSchema = new Schema<AssetReceiverInterface>({
    address: { type: String, required: true },
    createdAt: { type: Date, required: true },
    owner: { type: String, required: true },
    chainId: { type: String, required: true },
    token: { type: String, required: true },
  });
  
const AssetReceiver = models.AssetReceiver || model<AssetReceiverInterface>('AssetReceiver', assetReceiverSchema);


export {AssetReceiver, AssetReceiverInterface}
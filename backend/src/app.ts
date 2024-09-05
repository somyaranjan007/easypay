import express from "express";
import mongoose from "mongoose";
import { AssetReceiver, AssetReceiverInterface } from "./models/AssetReceiver";
import {
  addAddressToActivityWebHook,
  addAssetReceiverToAlchemy,
  createAddressActivityWebHook,
  createAssetReceiverDeployWebHook,
} from "./alchemy";
import { AssetTransfer, AssetTransferInterface } from "./models/AssetTransfer";
import { swap } from "./swapper";
import {
  ZERO_ADDRESS,
  assetReceiverFactoryDeployTopic,
} from "./utils/constants";
import { convertChainNameToNumber } from "./utils/helpers";
import "dotenv/config";
import { assetReceiverFactoryInterface } from "./utils/interface";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());


// const mongoString =
//   `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority&appName=Cluster0`;

const mongoString = "mongodb+srv://somyaranjankhatua122:ZbwJwCNktTPZCQSs@cluster0.ji2bsuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const database = mongoose.connection;
mongoose.connect(mongoString);
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(process.env.PORT || 3000, () => {
  return console.log(
    `Express is listening at http://localhost:${process.env.PORT || 3000}`
  );
});

app.get("/", (req, res) => {
  // const assetFactoryAddress = "0x7078D74E78a524227073b395c78D0225A6F87b68"
  // createAssetReceiverDeployWebHook(assetFactoryAddress)
  // createAddressActivityWebHook(assetFactoryAddress)
  res.send("Hello World!");
});

app.get("/get-asset-receiver", async (req, res) => {
  try {
    const owner = req.query.owner;
    if (!owner) {
      return res.status(400).send("Owner is required");
    }
    const assetReceivers = await AssetReceiver.findOne({ owner });
    if (!assetReceivers) {
      return res.status(404).send("No asset found for the owner");
    }
    res.status(200).send(assetReceivers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get-transfer-info", async (req, res) => {
  const address = req.query.address;
  console.log(address);
  if (!address) {
    return res.status(400).send("Owner is required");
  }
  try {

    const newAddr = address;
    console.log("0xbd19D0F6628ec353D12B642454AD131EcfA2Bb81" === address, address);
    const transferInfo = await AssetTransfer.find({ to: address.toString().toLowerCase() });

    // for (let i = 0; i > transferInfo.length; i++) {
    //   console.log(transferInfo[i].to);
    // }

    console.log(transferInfo);
    if (!transferInfo) {
      return res.status(404).send("Unable to get transfer info");
    }
    res.status(200).send(transferInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/asset-receiver-deployed", (req, res) => {
  try {
    const data = req.body;
    const eventData = data.event.data;
    const logs = eventData.block.logs;
    if (logs.length > 0) {
      const log = logs[0];
      0;
      const topics = log.topics;
      console.log(topics);
      if (topics[0] == assetReceiverFactoryDeployTopic) {
        const event = assetReceiverFactoryInterface.getEvent(topics[0]);
        const decoded = assetReceiverFactoryInterface.decodeEventLog(
          event,
          log.data,
          topics
        );
        const assetReceiver = decoded.assetReceiverAddress;
        const owner = decoded.owner;
        const token = decoded.token;
        const chainId = decoded.chainId.toString();
        saveAssetReceiverInDb(assetReceiver, chainId, token, owner);
        addAddressToActivityWebHook(
          assetReceiver,
          process.env.ADDRESS_ACTIVITY_WEBHOOK_ID
        );
        console.log(decoded);
      }
    }
    res.status(200).send("Received!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Failed!");
  }
});

app.post("/asset-receiver-activity", async (req, res) => {
  const data = req.body;
  const activities = data.event.activity;
  const assetReceivers = await AssetReceiver.find({});
  const network = data.event.network;
  const assetReceiverAddressesMap = new Map<string, AssetReceiverInterface>();
  for (const assetReceiver of assetReceivers) {
    assetReceiverAddressesMap.set(
      assetReceiver.address.toLowerCase(),
      assetReceiver
    );
  }
  console.log(assetReceiverAddressesMap);
  for (const activity of activities) {
    // todo: filter and combine activities that are just canceling each other like flashloan with deposit and withdrawals
    // also confirm the category of transfer
    if (assetReceiverAddressesMap.has(activity.toAddress.toLowerCase())) {
      // todo: add the data in the database
      const txHash = activity.hash;

      // if txhash not already in assettransfer
      const oldAssetTransfer = await AssetTransfer.findOne({
        transactionHash: txHash,
      });
      if (oldAssetTransfer) {
        console.log("txhash already in assettransfer");
        continue;
      }
      const assetReceiver = assetReceiverAddressesMap.get(activity.toAddress);
      const rawValue = BigInt(activity.rawContract.rawValue);
      if (rawValue <= 0) {
        console.log("raw value is 0");
        continue;
      }
      const assetTransferInfo: AssetTransferInterface = {
        from: activity.fromAddress,
        to: activity.toAddress,
        rawAmount: rawValue.toString(), // this is hex convert it to string base 10
        token: activity.rawContract.address ?? ZERO_ADDRESS,
        transactionHash: txHash,
        symbol: activity.asset,
        decimals: activity.rawContract.decimals,
        amount: activity.value,
        chain: convertChainNameToNumber(network),
        dstChain: assetReceiver.chainId, // todo: right now only the receiver chain is only sepolia but it will change later
        dstAddress: assetReceiver.owner,
        dstToken: assetReceiver.token,
        timestamp: new Date().toISOString(),
        native: activity.category == "external",
        network: "testnet"
      };
      console.log(assetTransferInfo);

      const assetTransfer = new AssetTransfer(assetTransferInfo);
      await assetTransfer.save();

      await swap(assetTransferInfo);
    }
  }
  res.status(200).send("Received!");
});

const saveAssetReceiverInDb = async (
  address: string,
  chainId: number,
  token: string,
  owner: string
) => {
  const assetReceiver = new AssetReceiver({
    address: address,
    createdAt: new Date(),
    chainId: chainId,
    token: token,
    owner: owner,
  });
  await assetReceiver.save();
};


import axios from "axios";
import { getGraphqlQuery } from "./utils/graphqlWebhookQuery";

const ASSET_RECEIVER_VARIABLE_NAME = "assetReceivers";
const ALCHEMY_TOKEN = process.env.ALCHEMY_TOKEN;
const BASE_URL = "https://dashboard.alchemy.com/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Alchemy-Token": ALCHEMY_TOKEN,
    "Content-Type": "application/json",
  },
});

const addAssetReceiverToAlchemy = async (assetReceiver: string) => {
  try {
    const payload = { add: [assetReceiver] };
    const response = await axiosInstance.patch(
      `/graphql/variables/${ASSET_RECEIVER_VARIABLE_NAME}`,
      payload
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error adding asset receiver to Alchemy:", error);
  }
};

const addAddressToActivityWebHook = async (address: string, webhookId: string) => {
  try {
    const payload = {
      addresses_to_add: [address],
      addresses_to_remove: [],
      webhook_id: webhookId,
    };
    const response = await axiosInstance.patch(
      "/update-webhook-addresses",
      payload
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error adding address to webhook:", error);
  }
};
const createAssetReceiverDeployWebHook = async (assetFactoryAddress: string) => {
    try {
        const graphqlQuery = getGraphqlQuery(assetFactoryAddress).replace(/\n/g, ' ')
      const payload = {

        
        network: "ARB_SEPOLIA",
        webhook_type: "GRAPHQL",
        graphql_query: {
            query: graphqlQuery,
            skip_empty_messages: true
          },
          webhook_url:
          "https://amrittestserver.serveo.net/asset-receiver-deployed",
      };
      const response = await axiosInstance.post("/create-webhook", payload);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating asset receiver deploy webhook:", error);
    }
  };
const createAddressActivityWebHook = async (address: string) => {
  try {
    const payload = {
      network: "ARB_SEPOLIA",
      webhook_type: "ADDRESS_ACTIVITY",
      addresses: [address],
      webhook_url:
        "https://amrittestserver.serveo.net/asset-receiver-activity",
    };
    const response = await axiosInstance.post("/create-webhook", payload);
    console.log(response.data);
  } catch (error) {
    console.error("Error creating address activity webhook:", error);
  }
};

export {
  addAssetReceiverToAlchemy,
  createAddressActivityWebHook,
  addAddressToActivityWebHook,
  createAssetReceiverDeployWebHook
};
import { createSlice } from "@reduxjs/toolkit";
import { sepolia } from "thirdweb/chains";
import { getRpcClient } from "thirdweb";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebState } from "../../types/types";

const clientId = process.env.THIRDWEB_CLIENT_ID;

if (!clientId) {
    throw new Error('No client ID provided');
}
const client = createThirdwebClient({
    clientId: clientId,
});

const rpcRequest = getRpcClient({
    client,
    chain: sepolia
});

const initialState: ThirdwebState = {
    client: client,
    rpcRequest: rpcRequest
}

const thirdwebSlice = createSlice({
    name: 'thirdweb',
    initialState,
    reducers: {},
});

export default thirdwebSlice.reducer;
import { Network, initializeSDK } from "@bitkub-chain/sdk.js";

export const sdk = initializeSDK(
  "6737d7cb789b97001c640d8c", // Client ID
  "sdk-e7750bb3-424a-44d0-8666-7216982ca107", // Project ID
  Network.BKC_TESTNET
);

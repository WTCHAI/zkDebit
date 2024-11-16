import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter"
import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: false,
  },
  networks: {
    hardhat: {
      allowBlocksWithSameTimestamp: true,
    },
    holesky: {
      url: process.env.HOLESKY! || "",
      accounts: [process.env.PRIVATE_KEY!]
    },
    sepolia: {
      url: process.env.SEPOLIA! || "",
      accounts: [process.env.PRIVATE_KEY!]
    },
    bitkub: {
      url: 'https://rpc-testnet.bitkubchain.io',
      accounts: [process.env.PRIVATE_KEY!]
    },
    flow: {
      url: 'https://testnet.evm.nodes.onflow.org',
      accounts: [process.env.PRIVATE_KEY!],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY! || "",
    customChains: [
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io"
        }
      }
    ]
  }
};

export default config;

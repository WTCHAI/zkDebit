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
    mainnet: {
      url: process.env.MAINNET! || "",
      accounts: [process.env.PRIVATE_KEY!]
    },
    goerli: {
      url: process.env.GOERLI_INFURA! || "",
      accounts: [process.env.PRIVATE_KEY!]
    },
    holesky: {
      url: process.env.HOLESKY! || "",
      accounts: [process.env.PRIVATE_KEY!]
    },
    sepolia: {
      url: process.env.SEPOLIA! || "",
      accounts: [process.env.PRIVATE_KEY!]
    },
    opSepolia: {
      url: process.env.OPSEPOLIA,
      accounts: [process.env.PRIVATE_KEY!]
    },
    abSepolia: {
      url: process.env.ARBTTESTNET,
      accounts: [process.env.PRIVATE_KEY!]
    },
    bscTestnet: {
      url: process.env.BSCTESTNET,
      accounts: [process.env.PRIVATE_KEY!]
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

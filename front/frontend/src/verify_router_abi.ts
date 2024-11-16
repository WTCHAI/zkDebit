export const router_abi = [
  {
    inputs: [
      { internalType: "address", name: "admin", type: "address" },
      {
        internalType: "contract ICardVerifier",
        name: "_verifier",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "_transactionHashed", type: "string" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "addTransactionHashedInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNounce",
    outputs: [{ internalType: "uint256", name: "_nounce", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "walletAddress", type: "address" },
    ],
    name: "getTransactionHashed",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTransactionHashed",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "transaction_hashed", type: "string" },
    ],
    name: "getTransactionInfo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "enum EStatus", name: "status", type: "uint8" },
        ],
        internalType: "struct ITransactionInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "transactionHashedToDetails",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "enum EStatus", name: "status", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifier",
    outputs: [
      { internalType: "contract ICardVerifier", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_transactionHashed", type: "string" },
      { internalType: "uint256[2]", name: "p_a", type: "uint256[2]" },
      { internalType: "uint256[2][2]", name: "p_b", type: "uint256[2][2]" },
      { internalType: "uint256[2]", name: "p_c", type: "uint256[2]" },
      { internalType: "uint256[2]", name: "pub_output", type: "uint256[2]" },
    ],
    name: "verifyTransaction",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const express = require('express');
const snarkjs = require('snarkjs');

const { ethers } = require('ethers');
const dotenv = require("dotenv");

dotenv.config();
const abi = require("./abi_bank.json");

const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 4000;

// interface in api backend 
// mock response interface {message : "" , payload ""}
const ITransactionStatus = {
    Unknown: 0,
    Pending: 1,
    Rejected: 2,
    Approved: 3
};

// mock card with the balance 
let cardsDataBase = [
    {
        // user account
        walletAddress: '0x61532aB1dA425cFD60631b74ad2B990C8931a25D',
        card_number: '1234567890123456',
        balance: 0,
    },
    {
        // shop account
        card_number: '1234567890123457',
        balance: 0
    }
];

let cardAndProof = [];

let transaction_log = [];
// 1. endpoint to send cardSetup.wasm and cardSetup_0000.zkey to the user
app.get('/user/request/card-setup', (req, res) => {
    res.zip([
        { path: './cardSetup_0000.zkey', name: 'cardSetup_0000.zkey' },
        { path: './cardSetup_js/cardSetup.wasm', name: 'cardSetup.wasm' }
    ]);
});

// 2. Endpoint to user send proof and verify the setup proof from PrivacyVisa and keep in bank backend 
app.post('/store-setup', async (req, res) => {
    const { proof, publicSignals, card_number } = req.body;
    // check that the card number is not already stored
    if (cardAndProof.find(card => card.card_number === card_number)) {
        console.log("Card already stored");
        res.status(400).json({ message: 'Card already stored', payload: "" });
        return;
    }
    try {
        const verificationKey = JSON.parse(fs.readFileSync("cardSetup_verification_key.json"));
        // Verify proof 
        const isValid = await snarkjs.groth16.verify(verificationKey, publicSignals, proof);
        if (isValid) {
            console.log("Setup proof verification successful");
            console.log("public ", publicSignals[1]);
            cardAndProof.push({ card_number: card_number, pi3: publicSignals[1] });
            res.status(200).json({ message: 'Proof verified and setup data stored', payload: "" });
        } else {
            console.log("Setup proof verification failed");
            res.status(400).json({ message: 'Invalid proof', payload: "" });
        }
    } catch (error) {
        console.error("Error during setup verification:", error);
        res.status(500).json({ message: 'Error during setup verification', payload: error.toString() });
    }
});

// 3. Endpoint to create a transaction order from shop initialize onchain
app.post('/create-transaction', async (req, res) => {
    const { transaction_hashed, amount, check_pi3 } = req.body;
    // check that the user's card number is stored in cards offchain
    const exists = transaction_log.find(
        (transaction) => transaction.transaction_hashed === transaction_hashed
    );
    if (exists) {
        res.status(400).json({ message: 'Transaction hashed is already declare tell shop re generate it', payload: "" });
        return;
    }
    const certain_card = cardAndProof.find(card => card.pi3 === check_pi3);
    if (!certain_card) {
        console.log("Card not found");
        res.status(400).json({ message: 'Card not found', payload: "" });
        return;
    }
    transaction_log.push({ transaction_hashed, amount });
    OnCreatingTransactionHashed(transaction_hashed, amount);
    res.status(200).json({ message: 'Transaction order created onchain', payload: transaction_hashed });
    return;
});

// 4. Endpoint to send cardVerification.wasm and cardVerification_0000.zkey to the user for generating verify proof 
app.get('/user/request/card-verification', async (req, res) => {
    res.zip([
        { path: './cardVerification_0000.zkey', name: 'cardVerification_0000.zkey' },
        { path: './cardVerification_js/cardVerification.wasm', name: 'cardVerification.wasm' }
    ]);
});

// 5. Endpoint to check the transaction status
app.get('/shop/check-transaction/:transaction_hashed', async (req, res) => {
    const { transaction_hashed } = req.params;
    // Querry transaction_hashed onchain and check is valid & onchain
    const transactionInfo = await OnGetTransactionInfo(transaction_hashed);

    // interface on chain ITransactionStatus = {
    //     Unknown: 0,
    //     Pending: 1,
    //     Rejected: 2,
    //     Approved: 3
    // };

    switch (transactionInfo.status) {
        case ITransactionStatus.Unknown:
            res.status(400).json({ message: 'Transaction order does not exist', payload: "" });
            console.log("Transaction status is Unknown.");
            return;
        case ITransactionStatus.Pending:
            res.status(400).json({ message: 'Transaction order waiting proof from user', payload: "" });
            console.log("Transaction is Pending. Please wait for approval.");
            return;
        case ITransactionStatus.Rejected:
            res.status(400).json({ message: 'Transaction failed. Invalid Proof from user', payload: "" });
            console.log("Transaction has been Rejected. Please check details.");
            return;
        case ITransactionStatus.Approved:
            if (cardsDataBase[1].balance < transactionInfo.amount) {
                res.status(400).json({ message: 'Tranaction succeed. But insufficient balance', payload: "" });
                return;
            }
            cardsDataBase[0].balance -= transactionInfo.amount
            cardsDataBase[1].balance += transactionInfo.amount
            res.status(200).json({ message: 'Tranaction succeed. Proof from user is valid', payload: "" });
            console.log("Transaction has been Approved!");
            return;
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Bank server is running on port ${PORT}`);
});


function OnCreatingTransactionHashed(transaction_hashed, amount) {
    const provider = new ethers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER);
    const walletPrivateKey = process.env.BANK_PRIVATE_KEY;
    if (!walletPrivateKey) {
        throw new Error("WALLET_PRIVATE_KEY is not defined in the environment variables.");
    }
    const wallet = new ethers.Wallet(walletPrivateKey, provider);
    const contract = new ethers.Contract("0x4736D41b89Fd4F4a5E54Cf1d1Ea501197BD29145", abi, wallet);

    try {
        contract.addTransactionHashedInfo(transaction_hashed, amount, {
            gasLimit: 300000,
            maxFeePerGas: ethers.parseUnits('50', 'gwei'),
            maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei')
        });
        return { status: true };
    } catch (error) {
        console.error("Error adding transaction:", error);
        return { status: false, error: error.message };
    }
}


async function OnGetTransactionInfo(transaction_hashed) {
    const provider = new ethers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER);
    const walletPrivateKey = process.env.BANK_PRIVATE_KEY;
    if (!walletPrivateKey) {
        throw new Error("WALLET_PRIVATE_KEY is not defined in the environment variables.");
    }
    const wallet = new ethers.Wallet(walletPrivateKey, provider);
    const contract = new ethers.Contract("0x4736D41b89Fd4F4a5E54Cf1d1Ea501197BD29145", abi, wallet);

    const TransactionInfo = await contract.getTransactionInfo(transaction_hashed, {
        gasLimit: 300000,
        maxFeePerGas: ethers.parseUnits('50', 'gwei'),
        maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei')
    });
    return {
        amount: Number(TransactionInfo.amount),
        status: Number(TransactionInfo.status)
    };
}



// Safe wallet


const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const erc20ContractAddress = process.env.ERC20_CONTRACT;
const erc20Abi = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "function balanceOf(address owner) view returns (uint256)",
];
const contract = new ethers.Contract(erc20ContractAddress, erc20Abi, provider);

// Utility function to find or create a wallet in the cache
const findOrCreateWallet = (walletAddress) => {
    let card = cardsDataBase.find(
        (card) => card.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );
    if (!card) {
        card = {
            walletAddress: walletAddress.toLowerCase(),
            card_number: Math.random().toString().slice(2, 18), // Generate random card number
            balance: 0,
            nonce: 0,
        };
        cardsDataBase.push(card);
    }
    return card;
};

// Utility function to update off-chain balance
const updateBalance = (walletAddress, value) => {
    // console.log("Updating balance for wallet: ", walletAddress);
    // const card = findOrCreateWallet(walletAddress);
    // console.log("cardsDataBase", card);
    cardsDataBase[0].balance += value;
    console.log(
        `Updated balance for wallet: ${walletAddress}, new balance: ${cardsDataBase[0].balance}`
    );
};

// Listen for Transfer events
contract.on("Transfer", async (from, to, value) => {
    console.log(`Transfer detected: from ${from} to ${to}, value: ${value}`);

    // Format the value to account for token decimals
    const decimals = 18; // Defaulting to 18 decimals; update if your token uses a different value
    const amount = parseFloat(ethers.formatUnits(value, decimals));

    // Ignore very small transfers
    if (amount < 0.0001) {
        console.log(`Transfer too small to process: ${amount} tokens`);
        return;
    }

    // Update the recipient's balance
    updateBalance(to, amount);
});

// Listen for Verify events
contract.on("Transfer", async (from, to, value) => {
    console.log(`Transfer detected: from ${from} to ${to}, value: ${value}`);

    // Format the value to account for token decimals
    const decimals = 18; // Defaulting to 18 decimals; update if your token uses a different value
    const amount = parseFloat(ethers.formatUnits(value, decimals));

    // Ignore very small transfers
    if (amount < 0.0001) {
        console.log(`Transfer too small to process: ${amount} tokens`);
        return;
    }

    // Update the recipient's balance
    updateBalance(to, amount);
});

// API to get balance
app.get("/balance/:walletAddress", (req, res) => {
    // const walletAddress = req.params.walletAddress.toLowerCase();
    // const card = cardsDataBase.find(
    // (card) => card.walletAddress.toLowerCase() === walletAddress
    // );
    // if (!card) {
    //     return res
    //         .status(404)
    //         .json({ error: `No balance found for wallet: ${walletAddress}` });
    // }
    res.json({
        // walletAddress: card.walletAddress,
        card_number: cardsDataBase[0].card_number,
        balance: cardsDataBase[0].balance,
    });
});

app.get("/balance/:card_number", (req, res) => {
    // const walletAddress = req.params.walletAddress.toLowerCase();
    // const card = cardsDataBase.find(
    // (card) => card.walletAddress.toLowerCase() === walletAddress
    // );
    // if (!card) {
    //     return res
    //         .status(404)
    //         .json({ error: `No balance found for wallet: ${walletAddress}` });
    // }
    res.json({
        // walletAddress: card.walletAddress,
        card_number: cardsDataBase[0].card_number,
        balance: cardsDataBase[0].balance,
    })
})




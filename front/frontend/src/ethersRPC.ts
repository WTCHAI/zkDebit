/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IProvider } from "@web3auth/base";
import { ethers } from "ethers";
import { abi } from "./abi";

import { router_abi }  from "./verify_router_abi";

const getChainId = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    // Get the connected Chain's ID
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails.chainId.toString();
  } catch (error) {
    return error;
  }
}

const getAccounts = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.getAddress();

    return await address;
  } catch (error) {
    return error;
  }
}

const getBalance = async (provider: IProvider): Promise<string> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.getAddress();

    // Get user's balance in ether
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address) // Balance is in wei
    );

    return balance;
  } catch (error) {
    return error as string;
  }
}

const sendTransaction = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    const destination = "0xd73F821fcA522Cbb672F8354d25470DBf4948c9C";

    const amount = ethers.parseEther("0.001");
    const fees = await ethersProvider.getFeeData()

    // Submit transaction to the blockchain
    const tx = await signer.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: fees.maxPriorityFeePerGas, // Max priority fee per gas
      maxFeePerGas: fees.maxFeePerGas, // Max fee per gas
    });

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    return error as string;
  }
}

const signMessage = async (provider: IProvider): Promise<any> => {
  try {
    // For ethers v5
    // const ethersProvider = new ethers.providers.Web3Provider(provider);
    const ethersProvider = new ethers.BrowserProvider(provider);

    // For ethers v5
    // const signer = ethersProvider.getSigner();
    const signer = await ethersProvider.getSigner();
    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const signedMessage = await signer.signMessage(originalMessage);

    return signedMessage;
  } catch (error) {
    return error as string;
  }
}

const getWord = async (provider: IProvider): Promise<any> => {
  const ethersProvider = new ethers.BrowserProvider(provider);
  const contract: any = new ethers.Contract(
    '0x918A24e082c00C8E8e232f2aF7a8149A97C66685',
    abi,
    ethersProvider
  );

  const word = await contract.getWord();
  return word;
}

const setWord = async (provider: IProvider, newWord: string): Promise<any> => {
  const ethersProvider = new ethers.BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();

  const contract: any = new ethers.Contract(
    '0x918A24e082c00C8E8e232f2aF7a8149A97C66685',
    abi,
    signer
  );

  const tx = await contract.setWord(newWord);
  const receipt = await tx.wait();

  return receipt.hash;
}

const GetNounce = async (
  provider: IProvider,
): Promise<any> => {
  try {
    // Initialize ethers provider and signer
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    const contract = new ethers.Contract("0x4277092B102fC0122f2c19d117927A1Cc142b949", router_abi, signer);

    // Call the contract method for submitting proof
    const response  = await contract.getNounce();
    return Number(response) ;
  } catch (error) {
    console.error("Error sending proof:", error);
    throw error;
  }
};

const VerifyProof = async (
  provider : IProvider,
  transaction_hashed : string,
  rawCallData : any
)=>{
  try {
    // "65168609622490722958074698824482263004689769532038453959314985274670332675080"
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();
    const contract = new ethers.Contract("0x62DE9519e5205fdEd52d0A583Aa3785438EB992d", router_abi, signer);
    console.log(rawCallData) ;
    const response = await contract.verifyTransaction(
      transaction_hashed,
      rawCallData[0],
      rawCallData[1],
      rawCallData[2],
      rawCallData[3]
    );
    return response 
  } catch (error) {
    console.error("Error sending proof:", error);
    return error;
  }
}

export default {getChainId, getAccounts, getBalance, sendTransaction, signMessage, getWord, setWord , GetNounce , VerifyProof};




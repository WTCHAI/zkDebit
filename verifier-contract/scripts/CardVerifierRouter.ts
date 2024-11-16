import hre, { ethers } from 'hardhat';
import * as dotenv from "dotenv";

const deploy = async () => {
  dotenv.config()

  const CardVerifier = await hre.ethers.getContractFactory("Groth16Verifier");
  const cardVerifierContract = await CardVerifier.deploy();
  const cardVerifierAddress = await cardVerifierContract.getAddress();

  const CardVerifierRouter = await hre.ethers.getContractFactory("BankVerifierRouter");
  const walletPrivateKey = process.env.PRIVATE_KEY;
  if (!walletPrivateKey) {
    throw new Error("PRIVATE_KEY is not defined in the environment variables.");
  }
  const wallet = new ethers.Wallet(walletPrivateKey , hre.ethers.provider);
  const cardVerifierRouterContract = await CardVerifierRouter.deploy(wallet.address,cardVerifierAddress);

  await cardVerifierRouterContract.deploymentTransaction()?.wait(3);

  const cardVerifierRouterAddress = await cardVerifierRouterContract.getAddress();

  console.log(`Groth16Verifier ADDRESS:`, cardVerifierAddress);
  console.log(`BankVerifierRouter ADDRESS:`, cardVerifierRouterAddress);

  try {
    await hre.run('verify:verify', {
      address: cardVerifierAddress,
      constructorArguments: []
    });
  }
  catch (e) {
    console.log("ERROR", e);
  }

  try {
    await hre.run('verify:verify', {
      address: cardVerifierRouterAddress,
      constructorArguments: [ wallet.address ,cardVerifierAddress ]
    });
  }
  catch (e) {
    console.log("ERROR", e);
  }
}

deploy().catch((err) => {
  console.log(err);
  process.exitCode = 1;
})
import hre, { ethers } from 'hardhat';

const contractVerify = 'CardVerifier';
const contractMain = 'CardVerifierRouter';

const deploy = async () => {
  const CardVerifier = await ethers.getContractFactory(contractVerify);
  const cardVerifierContract = await CardVerifier.deploy();
  const cardVerifierAddress = await cardVerifierContract.getAddress();

  const CardVerifierRouter = await ethers.getContractFactory(contractMain);
  const cardVerifierRouterContract = await CardVerifierRouter.deploy(cardVerifierAddress);

  await cardVerifierRouterContract.deploymentTransaction()?.wait(3);

  const cardVerifierRouterAddress = await cardVerifierRouterContract.getAddress();

  console.log(`${contractVerify} ADDRESS:`, cardVerifierAddress);
  console.log(`${contractMain} ADDRESS:`, cardVerifierRouterAddress);

  try {
    console.log(contractVerify)
    await hre.run('verify:verify', {
      address: cardVerifierAddress,
      contract: `contracts/${contractVerify}.sol:${contractVerify}`,
      constructorArguments: [],
    });
  }
  catch (e) {
    console.log("ERROR", e);
  }

  try {
    console.log(contractMain)
    await hre.run('verify:verify', {
      address: cardVerifierRouterAddress,
      contract: `contracts/${contractMain}.sol:${contractMain}`,
      constructorArguments: [cardVerifierAddress],
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
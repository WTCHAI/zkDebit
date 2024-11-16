const snarkjs = require('snarkjs');

const fs = require("fs");
const crypto = require('crypto');
const { execSync } = require('child_process');
const path = require('path')

// Function to hash the string using SHA-256 and convert it to a BigInt-compatible format
function hashStringToBigInt(input) {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return BigInt('0x' + hash).toString();
}

async function textToJson(){
    const destinationtxt = path.resolve(__dirname, 'generatecall','card_verification.txt');
    const data = fs.readFileSync(destinationtxt);
    const jsonData = { data: JSON.parse(`[${data}]`) };
    // console.log('Converted JSON:', jsonData);
    fs.writeFileSync('verify/card_verification.json',JSON.stringify(jsonData))
}


// Function to run shell commands
function runCommand(command) {
    try {
        console.log(`Executing: ${command}`);
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing command: ${command}`, error);
    }
}

// Step 1: Compile Circuits and Run Setup
function compileAndSetupCircuits() {
    runCommand('scripts/removeFiles.sh');

    // Compile the circuits
    runCommand('circom circom/CardSetup.circom --r1cs --wasm --sym');
    runCommand('circom circom/CardVerification.circom --r1cs --wasm --sym');
    
    // Move compiled files for both setup & verification
    const destinationCardsetup = path.resolve(__dirname, 'compile', 'cardSetup');
    runCommand(`cp CardSetup.r1cs CardSetup.sym ${destinationCardsetup}`);
    runCommand('rm CardSetup.r1cs CardSetup.sym');
    const destinationCardVerification = path.resolve(__dirname, 'compile', 'cardVerification');
    runCommand(`cp CardVerification.r1cs CardVerification.sym ${destinationCardVerification}`);
    // runCommand('rm CardVerification.r1cs CardVerification.sym');
    
    // Generated Power of Tau
    // runCommand("snarkjs powersoftau new bn128 12 pot/powersOfTau0000.ptau -v");
    // runCommand('echo "Setup zkVisa power of tau" | snarkjs powersoftau contribute pot/powersOfTau0000.ptau pot/powersOfTau0001.ptau --name="Setup zkVisa" -v');
    // runCommand('snarkjs powersoftau prepare phase2 pot/powersOfTau0001.ptau pot/powersOfTauFinal.ptau -v');
    runCommand('wget -nc https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau');
    const destinationPowerOfTau = path.resolve(__dirname,'pot');
    runCommand(`cp powersOfTau28_hez_final_12.ptau ${destinationPowerOfTau}`);
    runCommand('rm powersOfTau28_hez_final_12.ptau');

    // // Genearting zKey for card setup
    runCommand('snarkjs groth16 setup compile/cardSetup/cardSetup.r1cs pot/powersOfTau28_hez_final_12.ptau zkey/cardSetup/cardSetup00.zkey');
    // runCommand('echo "Setup zkVisa genearting zkey" | snarkjs zkey contribute  zkey/cardSetup/cardSetup00.zkey zkey/cardSetup/cardSetup01.zkey --name="Generating zkey 1st" -v');
    // Genearting zKey for card verification 
    runCommand('snarkjs groth16 setup compile/cardVerification/cardVerification.r1cs pot/powersOfTau28_hez_final_12.ptau zkey/cardVerification/cardVerification00.zkey');
    // runCommand('echo "Setup zkVisa genearting zkey" | snarkjs zkey contribute  zkey/cardVerification/cardVerification00.zkey zkey/cardVerification/cardVerification01.zkey --name="Generating zkey 1st" -v');

    // Export the verification keys
    runCommand('snarkjs zkey export verificationkey zkey/cardSetup/cardSetup00.zkey json/cardSetup/card_setup_verification_key.json');
    runCommand('snarkjs zkey export verificationkey zkey/cardVerification/cardVerification00.zkey json/cardVerification/card_verification_verification_key.json');
}
// Function to run the setup phase and generate PI1, PI2, PI3
async function runSetup() {
    try {
        const salt = "salt1234";
        const cvc = "123";  // Example CVC
        const cardnumber = "1234567890123456"; // Example card number
        const saltHashed = hashStringToBigInt(salt);
        const cvcHashed = hashStringToBigInt(cvc);
        console.log(
            {
                "cardNumber": cardnumber,
                "salt": saltHashed,
                "cvc": cvcHashed
            }
        )
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            {
                "cardNumber": cardnumber,
                "salt": saltHashed,
                "cvc": cvcHashed
            },
            "cardSetup_js/cardSetup.wasm",
            "zkey/cardSetup/cardSetup00.zkey"
        );

        console.log("Setup Public Signals (PI2, PI3):", publicSignals);

        // Write outputs to a file for later use in verification
        fs.writeFileSync("json/CardSetup/card_setup_public.json", JSON.stringify(publicSignals));
        fs.writeFileSync("json/CardSetup/card_setup_proof.json", JSON.stringify(proof));
        console.log("Setup public signals saved.");
    } catch (error) {
        console.error("Error in Setup Phase:", error);
    }
}

// Function to run the verification phase using PI1, PI2, PI3
async function runVerification() {
    try {
        // Retrieve expected PI1, PI2, PI3 from setup phase
        const cardSetupPublic = JSON.parse(fs.readFileSync("json/CardSetup/card_setup_public.json"));
        const expected_PI2 = cardSetupPublic[0];
        const expected_PI3 = cardSetupPublic[1];

        const salt = "salt1234";
        const cvc = "123";
        const cardnumber = "1234567890123456";

        const saltHashed = hashStringToBigInt(salt);
        const cvcHashed = hashStringToBigInt(cvc);
        const txHashed = hashStringToBigInt("order-001-amount-100");
        const nonceHashed = hashStringToBigInt("unique-nonce-value");
        console.log(
            {
                "cardNumber": cardnumber,            
                "pi2": expected_PI2,
                "pi3": expected_PI3,
                "cvc": cvcHashed,
                "salt": saltHashed,
                "transaction": txHashed,
                "nonce": nonceHashed,
            }
        )
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            {
                "cardNumber": cardnumber, 
                "pi2": expected_PI2,
                "pi3": expected_PI3,
                "cvc": cvcHashed,
                "salt": saltHashed,
                "transaction": txHashed,
                "nonce": nonceHashed,
            },
            "CardVerification_js/cardVerification.wasm",
            "zkey/CardVerification/cardVerification00.zkey"
        );
        console.log("Verification Public Signals:", publicSignals);

        // Write outputs to a file for verification check
        fs.writeFileSync("json/CardVerification/card_verification_proof.json", JSON.stringify(proof));
        fs.writeFileSync("json/CardVerification/card_verification_public.json", JSON.stringify(publicSignals));
        console.log("Verification proof and public signals saved.");
    } catch (error) {
        console.error("Error in Verification Phase:", error);
    }
}

async function generateCall(){
    runCommand("snarkjs generatecall json/CardVerification/card_verification_public.json json/CardVerification/card_verification_proof.json > generatecall/card_verification.txt");
    textToJson()
    // runCommand("snarkjs zkey export solidityverifier zkey/cardVerification/cardVerification01.zkey ../hardhat/contracts/cardVerification.sol");
}

async function main() {
    // console.log("Running Compile and Setup Circuit:");
    compileAndSetupCircuits();

    // console.log("Running Card Setup Phase:");
    await runSetup();

    // console.log("Running Card Verification Phase after creating transaction and what to proof :");
    await runVerification();

    // console.log("Prepare proof & public to verify onchain"); 
    generateCall();

    runCommand("snarkjs groth16 verify json/CardVerification/card_verification_verification_key.json json/CardVerification/card_verification_public.json json/CardVerification/card_verification_proof.json") ; 
}

main().then(() => {
    process.exit(0);
});

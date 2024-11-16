const express = require('express');
const snarkjs = require('snarkjs');
const fs = require('fs');
const execSync  = require('child_process');
const circomlibjs = require("circomlibjs");
const crypto = require('crypto');

function runCommand(command) {
  try {
      console.log(`Executing: ${command}`);
      execSync(command, { stdio: 'inherit' });
  } catch (error) {
      console.error(`Error executing command: ${command}`, error);
  }
}

export function compileAndSetupCircuits() {
  runCommand('./removeFiles.sh');

  // Compile the circuits
  runCommand('circom cardSetup.circom --r1cs --wasm --sym');
  runCommand('circom cardVerification.circom --r1cs --wasm --sym');

  // Download the Powers of Tau file
  runCommand('wget -nc https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau');

  // Generate the trusted setup zkey for both circuits
  runCommand('npx snarkjs groth16 setup cardSetup.r1cs powersOfTau28_hez_final_12.ptau cardSetup_0000.zkey');
  runCommand('npx snarkjs groth16 setup cardVerification.r1cs powersOfTau28_hez_final_12.ptau cardVerification_0000.zkey');

  // Export the verification keys
  runCommand('npx snarkjs zkey export verificationkey cardSetup_0000.zkey cardSetup_verification_key.json');
  runCommand('npx snarkjs zkey export verificationkey cardVerification_0000.zkey cardVerification_verification_key.json');
  
  // Run this script to generating verifier contract 
    runCommand("snarkjs zkey export solidityverifier cardVerification_0000.zkey CardVerifier.sol");

    runCommand("snarkjs generatecall verification_public.json verification_proof.json > generatecall/card_verification.txt");

  }
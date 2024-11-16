circom cardSetup.circom --r1cs --wasm --sym
circom cardVerification.circom --r1cs --wasm --sym
wget -nc https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau
npx snarkjs groth16 setup cardSetup.r1cs powersOfTau28_hez_final_12.ptau cardSetup_0000.zkey
npx snarkjs groth16 setup cardVerification.r1cs powersOfTau28_hez_final_12.ptau cardVerification_0000.zkey
npx snarkjs zkey export verificationkey cardSetup_0000.zkey cardSetup_verification_key.json
npx snarkjs zkey export verificationkey cardVerification_0000.zkey cardVerification_verification_key.json
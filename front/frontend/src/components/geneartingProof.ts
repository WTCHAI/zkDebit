import { groth16 } from 'snarkjs';
import CryptoJS from 'crypto-js';

import fs from "fs"

interface IForm {
    cardNumber: string,
    transactionHash: string,
    salt: string,
    cvc: string,
    amount: number ,
    nounce: string ,
    publicOutput1: string,
    publicOutput2: string
}

function hashStringToBigInt(input: string ) {
    // Hash the input string using SHA-256
    const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);

    // Convert the hexadecimal hash to BigInt and return it as a string
    return BigInt('0x' + hash).toString();
}

export async function generatingProof (
    form : IForm 
){
    const zkey = '/src/assets/CardVerification_0000.zkey'
    const wasm = "/src/assets/CardVerification.wasm";

    const saltHashed = hashStringToBigInt(form.salt);
    const cvcHashed = hashStringToBigInt(form.cvc);
    // Correct salt : salt1234
    // Correct tx hashed order-001-amount-100
    // Correct unique-nonce-value
    const txHashed = hashStringToBigInt(form.transactionHash);
    const nonceHashed = hashStringToBigInt(form.nounce);

    const input = {
        "cardNumber": form.cardNumber,
        "pi2": form.publicOutput1,
        "pi3": form.publicOutput2,
        "cvc": cvcHashed,
        "salt": saltHashed,
        "transaction": txHashed,
        "nonce": nonceHashed,
    };
    console.log(input)
    const { proof, publicSignals } = await groth16.fullProve(
        input,
        wasm,
        zkey
    );
    const rawCallData  = JSON.parse(`[${await groth16.exportSolidityCallData(proof, publicSignals)}]`)
    return rawCallData; 
}
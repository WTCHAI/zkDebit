// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24 ;

interface ICardVerifier {
    /**
     * @dev Verifies a Groth16 proof.
     * @param _pA The first part of the proof.
     * @param _pB The second part of the proof (a pairing product of two points).
     * @param _pC The third part of the proof.
     * @param _pubSignals The array of public input signals.
     * @return bool indicating whether the proof is valid or not.
     */
    
    function verifyProof(
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[2] calldata _pubSignals
    ) external view returns (bool);
    
}
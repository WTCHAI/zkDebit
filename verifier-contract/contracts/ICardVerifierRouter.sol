// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import { ICardVerifier } from "./ICardVerifier.sol";

enum EStatus {
    Unknown,
    Pending,
    Rejected,
    Approved
}

interface IBankVerifierRouter {
    // View functions
    function verifier() external view returns (ICardVerifier);

    function transactionHashedToDetails(string memory transaction_hashed)
        external
        view
        returns (uint amount, EStatus status);

    function walletToTransactionHashed(address walletAddress)
        external
        view
        returns (string[] memory);

    function getNounce() external view returns (uint _nounce);

    function getTransactionInfo(string memory transaction_hashed)
        external
        view
        returns (uint amount, EStatus status);

    function getTransactionHashed() external view returns (string[] memory);

    function getTransactionHashed(address walletAddress)
        external
        view
        returns (string[] memory);

    // State-changing functions
    function verifyTransaction(
        string memory _transactionHashed,
        uint[2] calldata p_a,
        uint[2][2] calldata p_b,
        uint[2] calldata p_c,
        uint[2] calldata pub_output
    ) external returns (bool);

    function addTransactionHashedInfo(
        string memory _transactionHashed,
        uint _amount
    ) external;

    // Ownership management
    function renounceOwnership() external view;

    function transferOwnership(address newOwner) external view;
}
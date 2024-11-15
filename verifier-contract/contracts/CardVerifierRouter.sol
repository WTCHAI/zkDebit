// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import { ICardVerifier } from "./ICardVerifier.sol"; 

enum EStatus {
  Unknown,    // 0 
  Pending,    // 1 
  Rejected,   // 2 
  Approved    // 3
}

struct TransactionInfo {
  uint amount; 
  EStatus status;
}

contract CardVerifierRouter {
  ICardVerifier public immutable verifier;    
  address admin;

  mapping (string => TransactionInfo) public transactionHashedToDetails;  
  mapping (address => string[]) walletToTransactionHashed; 

  constructor(
    ICardVerifier _verifier
  ) {
    verifier = _verifier;    
    admin = msg.sender;
  }

  function verifyTransaction(
    string memory _transactionHashed,
    uint[2] calldata p_a,
    uint[2][2] calldata p_b,
    uint[2] calldata p_c,
    uint[2] calldata pub_output
  ) public {
    require(
      transactionHashedToDetails[_transactionHashed].status != EStatus.Approved, 
      "Transaction already proof"
    ); 
    require(
      transactionHashedToDetails[_transactionHashed].status != EStatus.Unknown,
      "Invalid transaction nerver exist"
    );

    bool proof = verifier.verifyProof(p_a, p_b, p_c, pub_output);
    if (proof) {
      transactionHashedToDetails[_transactionHashed].status = EStatus.Approved;
    }
    else {
      transactionHashedToDetails[_transactionHashed].status = EStatus.Rejected; 
    }

    walletToTransactionHashed[msg.sender].push(_transactionHashed);
  }   

  function addTransactionHashedInfo(
    string memory _transactionHashed,
    uint _amount
  ) external {
    require(msg.sender == admin, 'only admin');
    transactionHashedToDetails[_transactionHashed] = TransactionInfo({
      amount: _amount,
      status: EStatus.Pending
    });
  }

  function getNounce() public view returns(uint _nounce){
    _nounce = walletToTransactionHashed[msg.sender].length; 
  }

  function checkTransactionValid (
    string memory _transactionHashed
  ) public view returns(EStatus){
    return transactionHashedToDetails[_transactionHashed].status; 
  }

  function getTransactionHashed () public view returns( string[] memory){
    return walletToTransactionHashed[msg.sender]; 
  }

  function getTransactionHashed (address walletAddress) public view returns(string[] memory ){
    return walletToTransactionHashed[walletAddress]; 
  }
}
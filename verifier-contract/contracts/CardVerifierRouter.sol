// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28 ;

// import { ICardVerifier } from "./ICardVerifier.sol" ;
import "@openzeppelin/contracts/access/Ownable.sol";
import { ICardVerifier } from "./ICardVerifier.sol" ; 

enum EStatus {
    Unknown,    // 0 
    Pending,    // 1 
    Rejected,   // 2 
    Approved    // 3
}

struct ITransactionInfo {
    uint amount ; 
    EStatus status ;
}

contract BankVerifierRouter is Ownable {
    ICardVerifier public immutable verifier;    

    mapping (string => ITransactionInfo) public transactionHashedToDetails;  
    mapping (address => string[]) walletToTransactionHashed; 

    constructor(
        address admin,
        ICardVerifier _verifier
    ) Ownable(admin) {
        verifier = _verifier ;    
    }

    // Verify proof call to verifiers contract 
    function verifyTransaction(
        string memory _transactionHashed,
        uint[2] calldata p_a,
        uint[2][2] calldata p_b,
        uint[2] calldata p_c,
        uint[2] calldata pub_output
    ) public returns (bool) {
        require(transactionHashedToDetails[_transactionHashed].status !=  EStatus.Approved ,"Transaction already proof") ; 
        require(transactionHashedToDetails[_transactionHashed].status !=  EStatus.Unknown,"Invalid transaction nerver exist") ; 
        try verifier.verifyProof(p_a, p_b, p_c, pub_output){
            transactionHashedToDetails[_transactionHashed].status = EStatus.Approved ;
            walletToTransactionHashed[msg.sender].push(_transactionHashed) ; 
            return true ;
        }catch {
            transactionHashedToDetails[_transactionHashed].status = EStatus.Rejected ;
            walletToTransactionHashed[msg.sender].push(_transactionHashed) ; 
            return false ;
        }
    }   

    // Bank intiaize transaction hashedprepare for receive verify proof from user 
    function addTransactionHashedInfo(
        string memory _transactionHashed,
        uint _amount
    ) external onlyOwner() {
        transactionHashedToDetails[_transactionHashed] = ITransactionInfo({
            amount : _amount,
            status : EStatus.Pending
        }) ;
    }

    // Getting nounce for each wallet address used to gnerating proof
    function getNounce() public view returns(uint _nounce){
        _nounce = walletToTransactionHashed[msg.sender].length ; 
    }

    // Get transaction info by from transactionHashed
    function getTransactionInfo(string memory transaction_hashed) public view returns( ITransactionInfo memory) { 
        return transactionHashedToDetails[transaction_hashed] ; 
    }

    //Getting transactions for each user wallet
    function getTransactionHashed () public view returns( string[] memory){
        return walletToTransactionHashed[msg.sender] ; 
    }
    function getTransactionHashed ( address walletAddress ) public view returns(string[] memory ){
        return walletToTransactionHashed[walletAddress] ; 
    }

    function renounceOwnership() public view override onlyOwner {
        revert("can't renounceOwnership here");
    }

    function transferOwnership(address newOwner) public view override onlyOwner {
        revert("transferOwnership is disabled for this contract");
    }

}
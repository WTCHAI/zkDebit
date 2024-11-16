import React, { useEffect, useState } from "react";

import cardSetupPublic from "../../src/assets/card_setup_public.json" ; 
import { generatingProof } from "./geneartingProof"; 

import { IProvider } from "@web3auth/base";
import RPC from "../ethersRPC";

interface IPayload {
    transaction_hashed : string,
    amount : number
}

export const TransactionForm = ({ payload , provider }: { payload: IPayload , provider : IProvider }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    transactionHash: "",
    salt: "",
    cvc: "",
    amount: 100,
    nounce : "",
    publicOutput1: "",
    publicOutput2: "",
  });
    const [callData , setCallData] = useState<any>()
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData , [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const payload = {
            ...formData,
            nounce : "unique-nonce-value"
        }
        const callData =  await generatingProof(payload)
        setCallData(callData)
    };

  useEffect(()=>{
    if (cardSetupPublic && payload )
    setFormData({
        ...formData,
        transactionHash: payload.transaction_hashed,
        amount: payload.amount,
        publicOutput1: cardSetupPublic[0],
        publicOutput2: cardSetupPublic[1],
      }) 
  },[ payload , cardSetupPublic ])

  useEffect(()=>{
    if (callData){
        const verify = async()=>{
            const response = await RPC.VerifyProof(
                provider,
                formData.transactionHash,
                callData
            )
            return response
        }
        verify()    
    }
  },[callData])


  return (
    <section>
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
            <label htmlFor="cardNumber" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Card Number
            </label>
            <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
            />
        </div>

        <div style={{ marginBottom: "20px" }}>
            <label
            htmlFor="transactionHash"
            style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
            >
                Transaction Hash
            </label>
            <input
                id="transactionHash"
                name="transactionHash"
                type="text"
                value={formData.transactionHash}
                onChange={handleChange}
                required
                style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
                disabled
            />
        </div>
        <div>
        </div>
            <div style={{ marginBottom: "20px" }}>
                <label htmlFor="cvc" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    CVC
                </label>
                <input
                id="cvc"
                name="cvc"
                type="text"
                value={formData.cvc}
                onChange={handleChange}
                required
                style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
                />
            <div style={{ marginBottom: "20px" }}>
                <label htmlFor="salt" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Salt
                </label>
                <input
                id="salt"
                name="salt"
                type="text"
                value={formData.salt}
                onChange={handleChange}
                required
                style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
                />
            </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
            <label htmlFor="publicOutput1" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Public output 1
            </label>
            <input
            id="publicOutput1"
            name="publicOutput1"
            type="text"
            value={formData.publicOutput1}
            onChange={handleChange}
            required
            style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
            disabled
            />
        </div>

        <div style={{ marginBottom: "20px" }}>
            <label htmlFor="publicOutput2" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Public Output 2
            </label>
            <input
                id="publicOutput2"
                name="publicOutput2"
                type="text"
                value={formData.publicOutput2}
                onChange={handleChange}
                required
                style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
                disabled
            />
        </div>
        <div style={{ marginBottom: "20px" }}>
            <label htmlFor="amount" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Amount 
            </label>
            <input
            id="amount"
            name="amount"
            type="text"
            value={formData.amount}
            onChange={handleChange}
            required
            style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
            />
        </div>
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
            type="submit"
            style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
            }}
            >
            Generate Proof
            </button>
        </div>
        </form>        
    </section>

  );
};

export default TransactionForm;
import React, { useEffect, useState } from "react";

interface IPayload {
    transaction_hashed : string,
    amount : number
}

export const TransactionForm = ({ payload }: { payload: IPayload }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    transactionHash: "",
    salt: "",
    cvc: "",
    amount: 0,
    nonce: 0,
    publicOutput1: "",
    publicOutput2: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
};

  useEffect(()=>{
    setFormData({
      ...formData,
      transactionHash: payload.transaction_hashed,
      amount: payload.amount
    }) 
  })

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
            />
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
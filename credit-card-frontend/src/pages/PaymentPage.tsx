import React, { useState } from "react";
import { processPayment } from "../services/paymentService";

const PaymentPage: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (!cardNumber || !amount || !description) {
      setMessage("All fields are required.");
      return;
    }

    const response = await processPayment(
      cardNumber,
      parseFloat(amount),
      description
    );
    setMessage(response || "Payment failed. Please try again.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Make a Payment</h1>
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="border p-2 mb-2 w-80"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-2 w-80"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-80"
      />
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Process Payment
      </button>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default PaymentPage;

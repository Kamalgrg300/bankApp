import React, { useState } from "react";
import { getCreditCardDetails } from "../services/creditCardService";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [creditCard, setCreditCard] = useState<any>(null);
  const [message, setMessage] = useState("");

  const fetchCardDetails = async () => {
    if (!cardNumber) {
      setMessage("Please enter a valid card number.");
      return;
    }
    const data = await getCreditCardDetails(cardNumber);
    if (!data) {
      setMessage("Card not found or unauthorized request.");
    } else {
      setCreditCard(data);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI-Powered Credit Card Dashboard
      </motion.h1>
      <motion.div
        className="w-full max-w-md bg-white shadow-xl rounded-lg p-6 text-gray-900"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Enter Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-lg focus:ring focus:ring-indigo-500 focus:outline-none"
        />
        <motion.button
          onClick={fetchCardDetails}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800 transition text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Fetch Details
        </motion.button>

        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}

        {creditCard && (
          <motion.div
            className="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
              Card Details
            </h2>
            <p className="text-lg">
              <strong>Card Number:</strong> {creditCard.cardNumber}
            </p>
            <p className="text-lg">
              <strong>Balance:</strong> ${creditCard.balance}
            </p>
            <p className="text-lg">
              <strong>Credit Limit:</strong> ${creditCard.creditLimit}
            </p>
            <p className="text-lg">
              <strong>Status:</strong> {creditCard.status}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { getTransactionsByCreditCardId } from "../services/transactionService";

const TransactionsPage: React.FC = () => {
  const [creditCardId, setCreditCardId] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const fetchTransactions = async () => {
    if (!creditCardId) {
      setMessage("Please enter a valid Credit Card ID.");
      return;
    }

    const data = await getTransactionsByCreditCardId(parseInt(creditCardId));
    if (data.length === 0) {
      setMessage("No transactions found for this card.");
    } else {
      setTransactions(data);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Transaction History</h1>
      <input
        type="text"
        placeholder="Enter Credit Card ID"
        value={creditCardId}
        onChange={(e) => setCreditCardId(e.target.value)}
        className="border p-2 mb-2 w-80"
      />
      <button
        onClick={fetchTransactions}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Fetch Transactions
      </button>

      {message && <p className="mt-4 text-red-500">{message}</p>}

      {transactions.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg w-2/3">
          <h2 className="text-xl font-bold mb-2">Transaction Details</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Amount</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">${transaction.amount}</td>
                  <td className="border p-2">{transaction.description}</td>
                  <td className="border p-2">{transaction.type}</td>
                  <td className="border p-2">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;

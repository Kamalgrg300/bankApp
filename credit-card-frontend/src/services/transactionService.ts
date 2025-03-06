import axios from "axios";

const API_URL = "http://localhost:8080/api/transaction"; // Adjust if needed

export const getTransactionsByCreditCardId = async (creditCardId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${creditCardId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure JWT authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions", error);
    return [];
  }
};

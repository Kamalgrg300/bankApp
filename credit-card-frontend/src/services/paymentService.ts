import axios from "axios";

const API_URL = "http://localhost:8080/api/payment"; // Adjust if needed

export const processPayment = async (
  cardNumber: string,
  amount: number,
  description: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/process`,
      { cardNumber, amount, description },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure JWT authentication
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Payment processing failed", error);
    return null;
  }
};

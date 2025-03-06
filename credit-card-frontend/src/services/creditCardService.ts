import axios from "axios";

const API_URL = "http://localhost:8080/api/creditcard"; // Adjust if needed

export const getCreditCardDetails = async (cardNumber: string) => {
  try {
    const token = localStorage.getItem("token"); // Get JWT token from local storage
    if (!token) {
      console.error("No token found, user not authenticated");
      return null;
    }

    const response = await axios.get(`${API_URL}/${cardNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in request
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching credit card details", error);
    return null;
  }
};

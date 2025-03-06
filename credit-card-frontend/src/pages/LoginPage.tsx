import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials
      );
      auth?.login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
      <motion.div
        className="w-full max-w-md bg-white text-gray-900 shadow-lg rounded-lg p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Login
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-lg focus:ring focus:ring-indigo-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-lg focus:ring focus:ring-indigo-500 focus:outline-none"
        />
        <motion.button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800 transition text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoginPage;

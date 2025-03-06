import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Credit Card Service</h1>
        <div>
          <Link
            to="/dashboard"
            className="px-4 py-2 hover:bg-blue-700 rounded transition"
          >
            Dashboard
          </Link>
          <Link
            to="/payment"
            className="px-4 py-2 hover:bg-blue-700 rounded transition"
          >
            Payment
          </Link>
          <Link
            to="/transactions"
            className="px-4 py-2 hover:bg-blue-700 rounded transition"
          >
            Transactions
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded transition"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

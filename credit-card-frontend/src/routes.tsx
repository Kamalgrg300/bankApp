import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PaymentPage from "./pages/PaymentPage";
import TransactionsPage from "./pages/TransactionPage";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

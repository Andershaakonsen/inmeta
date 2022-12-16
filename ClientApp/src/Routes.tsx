import { Routes, Route } from "react-router-dom";
import { useRequireLogin } from "./features/auth/auth.hooks";
import AuthPage from "./features/auth/AuthPage";
import SignOut from "./features/auth/SignOut";
import CustomersPage from "./features/customers/CustomersPage";
import IndexPage from "./features/IndexPage";
import NavBar from "./features/nav/NavBar";
import OrdersPage from "./features/orders/OrdersPage";

export const Router = () => {
  useRequireLogin();
  return (
    <>
      <SignOut />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
      <NavBar />
    </>
  );
};

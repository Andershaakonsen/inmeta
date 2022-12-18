import { ofetch } from "ofetch";
import { useEffect, useState } from "react";
import { Button } from "src/components";
import { useToken } from "src/context/AuthContext";
import CustomerForm from "src/features/customers/CustomerForm";
import CustomerList from "./CustomerList";
import { useCustomerContext } from "./CustomersContext";

const CustomersPage = () => {
  const [showCustomers, setShowCustomers] = useState(true);
  const token = useToken();
  const { setCustomers } = useCustomerContext();

  return (
    <div className="container mx-auto">
      {showCustomers ? (
        <CustomerList setShowCustomers={setShowCustomers} />
      ) : (
        <CustomerForm setShowCustomers={setShowCustomers} />
      )}
    </div>
  );
};

export default CustomersPage;

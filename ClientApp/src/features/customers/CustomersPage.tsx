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
      <div className="flex gap-2">
        <Button
          className="blue-border-int blue-bg-int rounded-md"
          onClick={() => setShowCustomers(true)}
        >
          Show Customers
        </Button>
        <Button
          className="blue-border-int blue-bg-int rounded-md"
          onClick={() => setShowCustomers(false)}
        >
          Add Customer
        </Button>
      </div>
      {showCustomers ? <CustomerList /> : <CustomerForm />}
    </div>
  );
};

export default CustomersPage;

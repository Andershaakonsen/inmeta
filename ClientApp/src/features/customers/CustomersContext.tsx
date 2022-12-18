import { Customer } from "src/types/api";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToken } from "src/context/AuthContext";
import { ofetch } from "ofetch";

interface ICustomersContext {
  customers: Customer[] | null;
  setCustomers: Dispatch<SetStateAction<Customer[] | null>>;
  fetchCustomers: () => void;
}

export const CustomersContext = React.createContext<ICustomersContext>(null!);

export const CustomersProvider = ({ children }: any) => {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const token = useToken();

  useEffect(() => {
    fetchCustomers();
  }, [token]);

  const fetchCustomers = async () => {
    const response = await ofetch("/api/Customer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCustomers(response.data);
  };
  return (
    <CustomersContext.Provider
      value={{ customers, setCustomers, fetchCustomers }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomerContext = () => React.useContext(CustomersContext);
export const useFetchCustomers = () => useCustomerContext().fetchCustomers;

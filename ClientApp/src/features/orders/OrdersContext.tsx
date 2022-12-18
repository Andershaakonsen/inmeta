import { ofetch } from "ofetch";
import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { useToken } from "src/context/AuthContext";
import { useToast } from "src/context/ToastContext";
import { Order, ServiceResponse } from "src/types/api";

interface IOrdersContext {
  orders: Order[] | null;
  setOrders: Dispatch<SetStateAction<Order[] | null>>;
  // fetchOrders: () => void;
  fetchOrders: () => void;
  deleteOrder: (id: string) => void;
  updateOrder: (order: Partial<Order>) => void;
}

export const OrdersContext = React.createContext<IOrdersContext>(null!);

export const OrdersProvider = ({ children }: any) => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const token = useToken();
  const Toast = useToast();
  useEffect(() => {
    fetchOrders();
  }, [token]);
  const fetchOrders = async () => {
    const response = await ofetch("/api/Order", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(response.data);
    console.log("Fetching orders:");
    console.log(response);
  };

  const deleteOrder = async (id: string) => {
    const response = await ofetch<ServiceResponse<Order>>(`/api/Order/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.success
      ? Toast.success(response.message)
      : Toast.error(response.message);

    fetchOrders();
  };

  const updateOrder = async (order: Partial<Order>) => {
    console.log("Update order in context: ", order);
    const response = await ofetch<ServiceResponse<Order>>("/api/Order", {
      method: "PUT",
      body: order,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.success
      ? Toast.success(response.message)
      : Toast.error(response.message);
    fetchOrders();
  };

  return (
    <OrdersContext.Provider
      value={{ orders, updateOrder, setOrders, fetchOrders, deleteOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrdersContext = () => React.useContext(OrdersContext);
export const useOrders = () => useOrdersContext().orders;
export const useSetOrders = () => useOrdersContext().setOrders;
export const useFetchOrders = () => useOrdersContext().fetchOrders;
export const useDeleteOrder = () => useOrdersContext().deleteOrder;
export const useUpdateOrder = () => useOrdersContext().updateOrder;

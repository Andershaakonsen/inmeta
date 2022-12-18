import React, { useState } from "react";
import { Button } from "src/components";
import { Order } from "src/types/api";
import OrderEditForm from "./OrderEditForm";
import OrderItem from "./OrderItem";
import { useFetchOrders, useOrders } from "./OrdersContext";

interface Props {
  setShowOrders: (bool: boolean) => void;
}
const OrdersList = ({ setShowOrders }: Props) => {
  //State
  const [edit, setEdit] = useState<Order | null>(null);
  //Context
  const orders = useOrders();
  const fetchOrders = useFetchOrders();

  if (edit) {
    return <OrderEditForm setEdit={setEdit} order={edit} />;
  }
  return (
    <div className="flex flex-col items-center ">
      {orders?.map((order) => (
        <OrderItem key={order.id} order={order} setEdit={setEdit} />
      ))}
      <Button
        onClick={() => setShowOrders(false)}
        className="blue-bg-int blue-border-int w-40 mt-4"
      >
        Add Order
      </Button>
    </div>
  );
};

export default OrdersList;

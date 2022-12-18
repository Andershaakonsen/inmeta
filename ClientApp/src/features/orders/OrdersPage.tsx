import { useState } from "react";
import OrderForm from "./OrderForm";
import OrdersList from "./OrdersList";

const OrdersPage = () => {
  const [showOrders, setShowOrders] = useState(true);
  return (
    <div className="container mx-auto">
      {showOrders ? (
        <OrdersList setShowOrders={setShowOrders} />
      ) : (
        <OrderForm setShowOrders={setShowOrders} />
      )}
    </div>
  );
};

export default OrdersPage;

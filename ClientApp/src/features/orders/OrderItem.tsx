import React from "react";
import { Order } from "src/types/api";
import { useCustomerContext } from "../customers/CustomersContext";

import { AiFillDelete } from "react-icons/ai";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useDeleteOrder } from "./OrdersContext";

interface Props {
  order: Order;
  setEdit: (order: Order) => void;
}

const OrderItem = ({ order, setEdit }: Props) => {
  //Context
  const { customers } = useCustomerContext();
  const deleteOrder = useDeleteOrder();

  const customer = customers?.find((c) => c.id === order.customerId);

  const handleDelete = () => {
    deleteOrder(order.id);
  };

  return (
    <div className="w-full mt-4  px-2 py-1">
      <div className=" grid grid-cols-12 text-radix-slate11">
        <p className="col-span-3"> Customer</p>
        <p className="col-span-3 ">Number</p>
        <p className="col-span-3 ">Email</p>
        <p className="col-span-3 ">Date</p>
      </div>
      <div className=" grid grid-cols-12 ">
        <p className="col-span-3 ">{customer?.name}</p>
        <p className="col-span-3 ">{customer?.phoneNumber}</p>
        <p className="col-span-3 ">{order.email}</p>
        <p className="col-span-3 ">{order.date.toLocaleString("no-No")}</p>
      </div>
      <div className=" grid grid-cols-12 mt-2 text-radix-slate11">
        <p className="col-span-3 ">Adress From</p>
        <p className="col-span-3 ">Address To</p>
        <p className="col-span-3 ">Note</p>
      </div>
      <div className=" grid grid-cols-12 border-b border-b-radix-blue5 py-2">
        <p className="col-span-3 ">{order.addressFrom}</p>
        <p className="col-span-3 ">{order.addressTo}</p>
        <p className="col-span-3 ">{order.note}</p>
        <div className="col-span-3 flex gap-4 text-3xl">
          <button onClick={() => setEdit(order)}>
            <MdModeEdit className="text-radix-blue7 hover:text-radix-blue7 hover:scale-125 transition-all " />
          </button>
          <button onClick={handleDelete}>
            <AiFillDelete className="text-radix-red7 hover:text-radix-red8 hover:scale-125 transition-all " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

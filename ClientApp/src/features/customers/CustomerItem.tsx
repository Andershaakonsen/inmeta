import React from "react";
import { Customer } from "src/types/api";

interface Props {
  customer: Customer;
}

const CustomerItem = ({ customer }: Props) => {
  return (
    <li className="flex text-radix-slate11 gap-4  border-b w-[800px] border-b-radix-blue7  text-md pb-2 mb-4 justify-center">
      <span>
        Name: <span className="text-radix-slate12">{customer.name}</span>{" "}
      </span>
      <span>
        Email: <span className="text-radix-slate12">{customer.email}</span>{" "}
      </span>
      <span>
        Phone Number:{" "}
        <span className="text-radix-slate12">{customer.phoneNumber}</span>{" "}
      </span>
    </li>
  );
};

export default CustomerItem;

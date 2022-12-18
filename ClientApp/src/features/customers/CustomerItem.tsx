import { ofetch } from "ofetch";
import { AiFillDelete } from "react-icons/ai";
import { useToken } from "src/context/AuthContext";
import { useToast } from "src/context/ToastContext";
import { Customer, ServiceResponse } from "src/types/api";
import { useFetchCustomers } from "./CustomersContext";

interface Props {
  customer: Customer;
}

const CustomerItem = ({ customer }: Props) => {
  const Toast = useToast();
  const fetchCustomers = useFetchCustomers();
  const token = useToken();

  const handleDelete = async () => {
    const response = await ofetch<ServiceResponse<Customer>>(
      `/api/Customer/${customer.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.success) {
      Toast.error(response.message);
    }

    Toast.success(response.message);
    fetchCustomers();
  };
  return (
    <li className=" text-radix-slate11 grid grid-cols-6 border-b w-full border-b-radix-blue7  text-md pb-2 mb-4 ">
      <span className="col-span-2">
        Name: <span className="text-radix-slate12 ">{customer.name}</span>{" "}
      </span>
      <span className="col-span-2">
        Email: <span className="text-radix-slate12">{customer.email}</span>{" "}
      </span>
      <span className="col-span-1">
        Phone Number:{" "}
        <span className="text-radix-slate12 ">{customer.phoneNumber}</span>{" "}
      </span>
      <div className="flex justify-center gap-6 col-span-1">
        <button onClick={handleDelete}>
          <AiFillDelete className="text-radix-red7 hover:text-radix-red8 hover:scale-125 transition-all text-2xl" />
        </button>
      </div>
    </li>
  );
};

export default CustomerItem;

import CustomerItem from "./CustomerItem";
import { useCustomerContext } from "./CustomersContext";

const CustomerList = () => {
  const { customers } = useCustomerContext();
  return (
    <div className="flex flex-col items-center mt-2">
      <h1 className="text-xl">My Customers</h1>
      <ul className="flex flex-col mt-5">
        {customers?.map((cus) => (
          <CustomerItem customer={cus} key={cus.id} />
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;

import { Button } from "src/components";
import CustomerItem from "./CustomerItem";
import { useCustomerContext } from "./CustomersContext";

interface Props {
  setShowCustomers: (bool: boolean) => void;
}
const CustomerList = ({ setShowCustomers }: Props) => {
  const { customers } = useCustomerContext();
  return (
    <div className="flex flex-col items-center mt-2">
      <h1 className="text-xl">My Customers</h1>
      <ul className="flex flex-col mt-5">
        {customers?.map((cus) => (
          <CustomerItem customer={cus} key={cus.id} />
        ))}
      </ul>
      <Button
        onClick={() => setShowCustomers(false)}
        className="mt-4 blue-border-int blue-bg-int"
      >
        Add Customer
      </Button>
    </div>
  );
};

export default CustomerList;

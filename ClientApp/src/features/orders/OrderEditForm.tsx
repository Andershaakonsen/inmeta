import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { Button, Input } from "src/components";
import { Order } from "src/types/api";
import { useCustomerContext } from "../customers/CustomersContext";
import { useUpdateOrder } from "./OrdersContext";

interface Props {
  order: Order | null;
  setEdit: (order: Order | null) => void;
}
interface FormData {
  addressFrom: string;
  addressTo: string;
  serviceType: string;
  phoneNumber: string;
  email: string;
  date: Date;
  note: string;
  customerId: string;
}

const OrderEditForm = ({ order, setEdit }: Props) => {
  //Context
  const { customers } = useCustomerContext();
  const updateOrder = useUpdateOrder();

  //Form
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      ...order,
    },
  });
  const onSubmit = async (data: FormData) => {
    updateOrder(data);
    setEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[700px]  flex flex-col px-2 text-sm"
    >
      <label> Customer</label>
      <select
        {...register("customerId")}
        className="w-1/2 bg-radix-slate5 mt-2 h-10 outline-none"
        required
      >
        <option disabled value="">
          Select a customer
        </option>
        {customers?.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>

      <label className="mt-2">Phone Number</label>
      <Input
        {...register("phoneNumber")}
        placeholder={order?.phoneNumber}
        required
      />

      <label className="mt-3">Email</label>
      <Input {...register("email")} placeholder={order?.email} required />

      <label className="mt-2">From Address</label>
      <Input {...register("addressFrom")} required />

      <label className="mt-2">Destination Address</label>
      <Input {...register("addressTo")} required />

      <label>Service Type</label>
      <select
        {...register("serviceType")}
        className="w-1/2 bg-radix-slate5 mt-2 h-10 outline-none"
        value="moving"
      >
        <option value="moving">Moving</option>
        <option value="packing">Packing</option>
        <option value="cleaning">Cleaning</option>
      </select>

      <label>Date </label>
      <Input {...register("date")} required type="datetime-local" />

      <label>Note</label>
      <Input {...register("note")} type="text" required />

      <div className="flex gap-4 justify-center  mt-4">
        <Button
          type="submit"
          className="green-bg-int green-border-int text-xl w-[100px]"
        >
          UPDATE
        </Button>
        <Button
          onClick={() => reset()}
          className="red-border-int red-bg-int text-xl w-[100px]"
          type="reset"
        >
          CLEAR
        </Button>
        <Button
          onClick={() => setEdit(null)}
          className="blue-border-int blue-bg-int text-xl w-[100px]"
        >
          <BiArrowBack />
        </Button>
      </div>
    </form>
  );
};

export default OrderEditForm;

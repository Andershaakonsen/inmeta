import { ofetch } from "ofetch";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "src/components";
import { useToken } from "src/context/AuthContext";
import { Customer, Order, ServiceResponse } from "src/types/api";
import { useCustomerContext } from "../customers/CustomersContext";
import { useFetchOrders, useSetOrders } from "./OrdersContext";
import { BiArrowBack } from "react-icons/bi";
import { useToast } from "src/context/ToastContext";

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
interface Props {
  setShowOrders: (bool: boolean) => void;
}
const OrderForm = ({ setShowOrders }: Props) => {
  //Context
  const { customers } = useCustomerContext();
  const token = useToken();
  const Toast = useToast();
  const fetchOrders = useFetchOrders();

  //Form
  const { register, handleSubmit, watch, setValue, reset } = useForm<FormData>({
    defaultValues: {
      customerId: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const response = await ofetch<ServiceResponse<Order>>("/api/Order", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    response.success
      ? Toast.success(response.message)
      : Toast.error(response.message);
    reset();
    fetchOrders();
  };

  const customerId = watch("customerId");

  const selectedCustomer = useMemo(() => {
    return customers?.find((customer) => {
      return customer.id.toString() === customerId;
    });
  }, [customerId]);

  useEffect(() => {
    if (!selectedCustomer) return;

    setValue("phoneNumber", selectedCustomer.phoneNumber);
    setValue("email", selectedCustomer.email);
  }, [selectedCustomer]);

  return (
    <div className="flex flex-col  mt-2 items-center">
      <h1 className="text-2xl">Add Order</h1>
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
          placeholder={selectedCustomer?.phoneNumber}
          required
        />

        <label className="mt-3">Email</label>
        <Input
          {...register("email")}
          placeholder={selectedCustomer?.email}
          required
        />

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
            Submit
          </Button>
          <Button
            onClick={() => reset()}
            className="red-border-int red-bg-int text-xl w-[100px]"
          >
            Clear
          </Button>
          <Button
            onClick={() => setShowOrders(true)}
            className="blue-border-int blue-bg-int text-xl w-[100px]"
          >
            <BiArrowBack />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;

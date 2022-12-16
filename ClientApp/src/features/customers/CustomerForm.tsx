import { ofetch } from "ofetch";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "src/context/AuthContext";
import { useToast } from "src/context/ToastContext";
import {
  useCustomerContext,
  useFetchCustomers,
} from "src/features/customers/CustomersContext";
import { Customer, ServiceResponse } from "src/types/api";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
}
const CustomerForm = () => {
  const { setCustomers } = useCustomerContext();
  const { token } = useAuthContext();
  const fetchCustomers = useFetchCustomers();
  const Toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(token);
    const response = await ofetch<ServiceResponse<Customer[]>>(
      "/api/Customer",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: data,
      }
    );
    if (!response.success) {
      Toast.error(response.message);
      return;
    }

    Toast.success(response.message);
    fetchCustomers();

    reset();
  };
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <h1 className="text-2xl ">Register Customer</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[400px]"
      >
        <label>Name</label>
        <span className="text-radix-red9">{errors.name?.message}</span>
        <Input
          type="text"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters!",
            },
          })}
        />

        <label htmlFor="name">Email</label>
        <span className="text-radix-red9">{errors.email?.message}</span>
        <Input
          type="email"
          {...register("email", {
            required: "Emails is required",
          })}
        />
        <span className="text-radix-red9">{errors.phoneNumber?.message}</span>
        <label>Phone Number</label>
        <Input
          type="number"
          {...register("phoneNumber", {
            required: "Phone Number is required!",
          })}
        />
        <div className="flex w-full justify-around mt-4">
          <Button
            type="submit"
            className="blue-bg-int blue-border-int w-[150px]"
          >
            Register
          </Button>
          <Button
            onClick={() => {
              reset();
            }}
            className="red-bg-int red-border-int w-[150px]"
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;

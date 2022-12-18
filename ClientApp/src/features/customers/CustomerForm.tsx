import { ofetch } from "ofetch";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
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

interface Props {
  setShowCustomers: (bool: boolean) => void;
}
const CustomerForm = ({ setShowCustomers }: Props) => {
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
    <div className="flex flex-col justify-center mt-20 items-center">
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

        <div className="flex gap-4 justify-around mt-4">
          <Button className="green-bg-int green-border-int text-xl w-[100px]">
            Submit
          </Button>
          <Button
            onClick={() => reset()}
            className="red-border-int red-bg-int text-xl w-[100px]"
          >
            Clear
          </Button>
          <Button
            onClick={() => setShowCustomers(true)}
            className="blue-border-int blue-bg-int text-xl w-[100px]"
          >
            <BiArrowBack />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;

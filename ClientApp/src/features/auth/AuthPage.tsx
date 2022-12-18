import { useState } from "react";
import { Button, Input } from "src/components";
import { useForm } from "react-hook-form";
import { ofetch } from "ofetch";
import { useAuthContext } from "src/context/AuthContext";
import { useToast } from "src/context/ToastContext";

const AuthPage = () => {
  const [displayLogin, setDisplayLogin] = useState(true);

  const { token, user } = useAuthContext();
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      {displayLogin ? <Login /> : <Register />}
      {displayLogin ? (
        <p className="text-radix-slate11 mt-4 text-center">
          Not a user? Click{" "}
          <button
            className="text-radix-blue7 hover:text-radix-blue9"
            onClick={() => setDisplayLogin(false)}
          >
            here
          </button>{" "}
          to register!
        </p>
      ) : (
        <p className="text-radix-slate11 mt-4 text-center">
          Allready a user? Click{" "}
          <button
            onClick={() => setDisplayLogin(true)}
            className="text-radix-blue7 hover:text-radix-blue9"
          >
            here
          </button>{" "}
          to log in!
        </p>
      )}
    </div>
  );
};

export interface FormData {
  email: string;
  password: string;
  displayName?: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { setToken, setUser } = useAuthContext();
  const Toast = useToast();

  const onSubmit = async (data: FormData) => {
    const tokenResponse = await ofetch("/api/User/Login", {
      method: "POST",
      body: data,
    });
    // console.log("Token Response:");
    // console.log(tokenResponse.data);
    // const userResponse = await ofetch("/api/User", {
    //   headers: {
    //     Authorization: `Bearer ${tokenResponse.data}`,
    //   },
    // });
    // console.log("User Response:");
    // console.log(userResponse.data);
    setToken(tokenResponse.data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col border border-radix-slate6 p-4 rounded-md "
    >
      <h2 className="text-2xl text-center">Login</h2>
      <label className="mt-4">Email</label>
      <Input {...register("email")} className="w-[400px] mt-2" />
      <label className="mt-4">Password</label>
      <Input
        {...register("password")}
        className="w-[400px] mt-2"
        type="password"
      />
      <Button className="blue-bg-int blue-border-int w-[150px] mx-auto mt-4">
        Log in
      </Button>
    </form>
  );
};

export const Register = () => {
  const { setToken } = useAuthContext();
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    const response = await ofetch("/api/User/Register", {
      method: "POST",
      body: data,
    });
    // console.log(response.data);

    // const userResponse = await ofetch("/api/User", {
    //   headers: {
    //     Authorization: `Bearer ${response.data}`,
    //   },
    // });
    // console.log(userResponse);

    setToken(response.data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col border border-radix-slate6 p-4 rounded-md "
    >
      <h2 className="text-2xl text-center">Register</h2>
      <label className="mt-4">Display Name</label>
      <Input {...register("displayName")} required className="w-[400px] mt-2" />
      <label className="mt-4">Email</label>
      <Input {...register("email")} required className="w-[400px] mt-2" />
      <label className="mt-4">Password</label>
      <Input
        required
        {...register("password")}
        className="w-[400px] mt-2"
        type="password"
      />
      <Button className="blue-bg-int blue-border-int w-[150px] mx-auto mt-4">
        Register
      </Button>
    </form>
  );
};
export default AuthPage;

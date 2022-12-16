import React from "react";
import { Button } from "src/components";
import { useSetToken } from "src/context/AuthContext";

const SignOut = () => {
  const setToken = useSetToken();
  return (
    <div className="w-full flex justify-end">
      <Button
        onClick={() => setToken(null)}
        className="slate-bg-int slate-border-int mr-2 mt-2 text-radix-slate11 hover:text-radix-slate12 rounded-md"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;

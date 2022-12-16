import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "src/context/AuthContext";

export const useRequireLogin = () => {
  const token = useToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") return;
    if (token === null) {
      navigate("/login");
    }
  }, [token, location]);
};

import { useContext, useEffect, useState } from "react";
import { createContext } from "vm";
import React from "react";
import { IUser } from "src/types/api";
import { authFetch } from "src/features/auth/auth.fetcher";

interface IAuthContext {
  token: string | null;
  user: IUser | null;
  setUser: (user: IUser) => void;
  setToken: (token: string | null) => void;
}
// export const AuthContext =  createContext()
export const AuthContext = React.createContext<IAuthContext>(undefined!);

export const AUTH_STORAGE_KEY = "inmeta-access-token";

export const AuthProvider = ({ children }: any) => {
  // Get token from LS on init
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem(AUTH_STORAGE_KEY) || null;
    return storedToken;
  });

  const [user, setUser] = useState<IUser | null>(null);

  // On token change - Set local storage
  useEffect(() => {
    if (token) localStorage.setItem(AUTH_STORAGE_KEY, token);
    else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    authFetch<IUser>("/api/User")
      .then((user) => setUser(user))
      // If token fails, i.e expired, logout
      .catch(() => {
        setToken(null);
        setUser(null);
      });
  }, [token]);

  console.log(user);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
export const useSetToken = () => useAuthContext().setToken;
export const useToken = () => useAuthContext().token;

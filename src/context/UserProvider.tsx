import { FC, useState, ReactNode } from "react";
import { createContext } from "react";
import { User } from "../types/auth";

export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
}>({
  user: null,
  setUser: (user: User) => {},
  login: () => {},
  logout: () => {},
});

export interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    const remember = localStorage.getItem("remember") === "true";

    if (remember) localStorage.setItem("token", userData.token);
    else sessionStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    const remember = localStorage.getItem("remember") === "true";

    if (remember) localStorage.removeItem("token");
    else sessionStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

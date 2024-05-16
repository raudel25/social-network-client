import { HttpMethods } from "../types/api";
import { LoginForm, RegisterForm, User } from "../types/auth";
import { apiNoToken, apiWithToken } from "./fetch";

export const authService = () => {
  function method<T>(data: T, endpoint: string) {
    return apiNoToken<T, User>(`auth/${endpoint}`, data, HttpMethods.POST);
  }

  const login = (data: LoginForm) => method<LoginForm>(data, "login");
  const registerAgency = (data: RegisterForm) =>
    method<RegisterForm>(data, "register");
  const renew = () =>
    apiWithToken<{}, User>("auth/renew", {}, HttpMethods.POST);

  return { login, registerAgency, renew };
};

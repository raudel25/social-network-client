import { HttpMethods, Pagination } from "../types/api";
import { Profile } from "../types/profile";
import { apiWithToken } from "./fetch";

export const profileService = () => {
  function method<T1, T2>(data: T1, endpoint?: string, query?: any) {
    const url = endpoint !== undefined ? `/${endpoint}` : "";
    return apiWithToken<T1, T2>(`profile${url}`, data, HttpMethods.GET, query);
  }

  const getProfiles = (query: any) =>
    method<{}, Pagination<Profile>>({}, undefined, query);

  const getByUsername = (username: string) => method<{}, Profile>({}, username);

  return { getProfiles, getByUsername };
};

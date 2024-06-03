import { HttpMethods, Pagination } from "../types/api";
import { Profile, ProfileForm } from "../types/profile";
import { apiWithToken } from "./fetch";

export const profileService = () => {
  function method<T1, T2>(
    method: HttpMethods,
    data: T1,
    endpoint?: string,
    query?: any
  ) {
    const url = endpoint !== undefined ? `/${endpoint}` : "";
    return apiWithToken<T1, T2>(`profile${url}`, data, method, query);
  }

  const getProfiles = (query: any) =>
    method<{}, Pagination<Profile>>(HttpMethods.GET, {}, undefined, query);

  const getByUsername = (username: string) =>
    method<{}, Profile>(HttpMethods.GET, {}, username);
  const updateProfile = (data: ProfileForm) =>
    method<ProfileForm, {}>(HttpMethods.PUT, data);
  const getByFollowed = (username: string, query: any) =>
    method<{}, Pagination<Profile>>(
      HttpMethods.GET,
      {},
      `followed/${username}`,
      query
    );

  const getByFollower = (username: string, query: any) =>
    method<{}, Pagination<Profile>>(
      HttpMethods.GET,
      {},
      `follower/${username}`,
      query
    );

  return {
    getProfiles,
    getByUsername,
    updateProfile,
    getByFollowed,
    getByFollower,
  };
};

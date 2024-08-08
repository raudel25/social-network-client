import { HttpMethods } from "../types/api";
import { PostForm } from "../types/home";
import { apiWithToken } from "./fetch";

export const postService = () => {
  function method<T1, T2>(
    method: HttpMethods,
    data: T1,
    endpoint?: string,
    query?: any
  ) {
    const url = endpoint !== undefined ? `/${endpoint}` : "";
    return apiWithToken<T1, T2>(`post${url}`, data, method, query);
  }

  const newPost = (data: PostForm) =>
    method<PostForm, {}>(HttpMethods.POST, data);

  return { newPost };
};

import { HttpMethods, Pagination } from "../types/api";
import { MessageForm, Post, PostForm } from "../types/post";
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

  const getPosts = (query: any) =>
    method<{}, Pagination<Post>>(HttpMethods.GET, {}, undefined, query);

  const getPostById = (id: number) =>
    method<{}, Post>(HttpMethods.GET, {}, `${id}`);

  const getByUsername = (username: string, query: any) =>
    method<{}, Pagination<Post>>(
      HttpMethods.GET,
      {},
      `user/${username}`,
      query
    );

  const getByRePostId = (id: number, query: any) =>
    method<{}, Pagination<Post>>(HttpMethods.GET, {}, `rePost/${id}`, query);

  const reaction = (id: number) =>
    method<{}, {}>(HttpMethods.POST, {}, `reaction/${id}`);

  const message = (id: number, form: MessageForm) =>
    method<MessageForm, {}>(HttpMethods.POST, form, `message/${id}`);

  return {
    newPost,
    getPosts,
    getByUsername,
    reaction,
    getPostById,
    getByRePostId,
    message,
  };
};

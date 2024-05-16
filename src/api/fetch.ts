import { ApiResponse, HttpMethods } from "../types/api";
import querystring from "querystring";

const baseUrl: string | undefined = process.env.REACT_APP_API_URL;

export const fetchNoToken = (
  endpoint: string,
  data: any,
  method: HttpMethods = HttpMethods.GET,
  query: any = {}
): Promise<Response> => {
  const queryString =
    Object.keys(query).length === 0 ? "" : `?${querystring.stringify(query)}`;
  const url = `${baseUrl}/${endpoint}${queryString}`;

  if (method === HttpMethods.GET) {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = (
  endpoint: string,
  data: any,
  method: HttpMethods = HttpMethods.GET,
  query: any = {}
): Promise<Response> => {
  const queryString =
    Object.keys(query).length === 0 ? "" : `?${querystring.stringify(query)}`;
  const url = `${baseUrl}/${endpoint}${queryString}`;

  const token = localStorage.getItem("token") || "";

  if (method === HttpMethods.GET) {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export async function apiWithToken<T1, T2>(
  endpoint: string,
  data: T1,
  method: HttpMethods = HttpMethods.GET,
  query: any = {}
): Promise<ApiResponse<T2>> {
  try {
    const resp = await fetchWithToken(endpoint, data, method, query);
    const body = await resp.json();

    return body;
  } catch {
    return {
      ok: false,
      message: "Connection error",
    };
  }
}

export async function apiNoToken<T1, T2>(
  endpoint: string,
  data: T1,
  method: HttpMethods = HttpMethods.GET,
  query: Record<string, string> = {}
): Promise<ApiResponse<T2>> {
  try {
    const resp = await fetchNoToken(endpoint, data, method, query);
    const body = await resp.json();

    return body;
  } catch {
    return {
      ok: false,
      message: "Connection error",
    };
  }
}

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

  const token =
    localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? "";

  if (method === HttpMethods.GET) {
    return fetch(url, {
      method,
      headers: {
        Authorization: token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        Authorization: token,
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

    return { ok: body.ok, message: body.message, value: body.data };
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

    return { ok: body.ok, message: body.message, value: body.data };
  } catch {
    return {
      ok: false,
      message: "Connection error",
    };
  }
}

export async function uploadPhoto(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const token =
    localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? "";

  try {
    const resp = await fetch(`${baseUrl}/photo/upload`, {
      method: HttpMethods.POST,
      body: formData,
      headers: {
        Authorization: token,
      },
    });
    const body = await resp.json();

    return { ok: body.ok, message: body.message, value: body.data as number };
  } catch {
    return {
      ok: false,
      message: "Connection error",
    };
  }
}

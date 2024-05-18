export interface ApiResponse<T> {
  ok: boolean;
  message: string;
  value?: T;
}

export interface Photo {
  id: number;
  src: string;
}

export interface RichText {
  html: string;
  text: string;
}

export interface Pagination<T> {
  limit: number;
  page: number;
  totalRows: number;
  totalPages: number;
  rows: T[];
}

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

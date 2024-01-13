import axios, { AxiosRequestConfig } from "axios";

export const baseURL = process.env.BASE_URL;

// localStorage.setItem(
//   "accessToken",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTc1ZjRlZDk3YzQ5ODg4YjAzOTc3NyIsImlhdCI6MTcwMzc1NjIzNCwiZXhwIjoxNzE5MzA4MjM0fQ.vRkGJaQNBGXEAjm6kQmWeVqpkPBFyebxtNh1YY0a654"
// );

export const instance = axios.create({
  baseURL,
  headers: {
    App: "app",
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

export interface APIRequestInterface<T> {
  data: T;
  message: string;
  success: boolean;
  error: { message: string };
}

const apiCall = async <T, U>(
  url: string,
  method: string,
  body?: U,
  admin = true
): Promise<APIRequestInterface<T>> => {
  const config: AxiosRequestConfig<U> = {
    method,
    url,
    data: body,
  };
  config.headers = {
    App: admin ? "admin" : "app",
  };
  const response = await instance(config);
  return response.data;
};

export default apiCall;

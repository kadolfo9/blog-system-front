import axios, { InternalAxiosRequestConfig } from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.headers) {
      config.headers.Accept = "application/json";
    }

    return config;
  }
);
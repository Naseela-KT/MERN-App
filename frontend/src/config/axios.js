import axios from "axios";
import { api } from "./api";

const authApi = axios.create({
  baseURL: api.authBaseURL,
  withCredentials: true,
});

const adminApi = axios.create({
  baseURL: api.pwdBaseURL,
  withCredentials: true,
});

authApi.interceptors.request.use((api) => {
  const Token = localStorage.getItem("Token");
  if (Token !== null) {
    api.headers.authorization = `Bearer ${Token}`;
  }
  return api;
});

export const userApiRequest = async (api) => {
  const response = await authApi(api);
  return response.data;
};

export const pwdApiRequest = async (api) => {
  const response = await adminApi(api);
  return response.data;
};

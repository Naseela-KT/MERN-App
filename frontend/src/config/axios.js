import axios from "axios";
import { api } from "./api";

const authApi = axios.create({
  baseURL: api.authBaseURL,
  withCredentials: true,
});

const userApi = axios.create({
  baseURL: api.userBaseURL,
  withCredentials: true,
});

authApi.interceptors.request.use((api) => {
  const Token = localStorage.getItem("Token");
  if (Token !== null) {
    api.headers.authorization = `Bearer ${Token}`;
  }
  return api;
});

export const authApiRequest = async (api) => {
  const response = await authApi(api);
  return response.data;
};

export const userApiRequest = async (api) => {
  const response = await userApi(api);
  return response.data;
};

import axios from "axios";
import { tokenManager } from "../auth/tokenManager";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

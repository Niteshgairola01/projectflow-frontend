import { api } from "../../../shared/services/api/axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types/auth.types";

export const authApi = {
  // register
  register: async (data: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data?.data;
  },

  // login
  login: async (data: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data?.data;
  },

  // current user
  me: async () => {
    const response = await api.get("/auth/me");
    return response.data?.data;
  },

  // logout
  logout: () => api.post("/auth/logout"),

  // refresh token
  refreshToken: async () => {
    const response = await api.post("/auth/refresh");
    return response.data?.data;
  },
};

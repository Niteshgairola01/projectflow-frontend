import { api } from "../../../shared/services/api/axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  RefreshTokenResponse,
  User,
} from "../types/auth.types";
import type { ApiResponse } from "../../../shared/types/api.types";

export const authApi = {
  // register
  register: async (data: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post<ApiResponse<RegisterResponse>>("/auth/register", data);
    return response.data.data;
  },

  // login
  login: async (data: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/login", data);
    return response.data.data;
  },

  // current user
  me: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>("/auth/me");
    return response.data.data;
  },

  // logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // refresh token
  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const response = await api.post<ApiResponse<RefreshTokenResponse>>("/auth/refresh");
    return response.data.data;
  },

  // get user by id
  getUserById: async (userId: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/auth/user/${userId}`);
    return response.data.data;
  },
};

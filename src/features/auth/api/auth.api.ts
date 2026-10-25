import { tokenManager } from "../../../shared/services/auth/tokenManager";
import { api } from "../../../shared/services/api/axios";
import type {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  RefreshTokenResponse,
  User,
} from "../types/auth.types";
import type { ApiResponse } from "../../../shared/types/api.types";

let refreshPromise: Promise<RefreshTokenResponse> | null = null;

export const authApi = {
  forgotPassword: async (data: ForgotPasswordPayload): Promise<void> => {
    await api.post("/auth/forgot-password", data);
  },

  resetPassword: async (data: ResetPasswordPayload): Promise<void> => {
    await api.post("/auth/reset-password", data);
  },

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
  refreshToken: (): Promise<RefreshTokenResponse> => {
    // Startup and expired API requests must share the same refresh attempt.
    if (!refreshPromise) {
      refreshPromise = api.post<ApiResponse<RefreshTokenResponse>>("/auth/refresh")
        .then((response) => {
          tokenManager.setToken(response.data.data.accessToken);
          return response.data.data;
        })
        .finally(() => { refreshPromise = null; });
    }
    return refreshPromise;
  },

  // get user by id
  getUserById: async (userId: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/auth/user/${userId}`);
    return response.data.data;
  },
};

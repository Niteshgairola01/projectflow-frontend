import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { tokenManager } from "../auth/tokenManager";
import { authApi } from "../../../features/auth/api/auth.api";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response?.status === 401;

    const isRefreshRequest =
      originalRequest.url?.includes("/auth/refresh");

    // Don't refresh if:
    // 1. It's not a 401
    // 2. The request itself is the refresh request
    // 3. We already retried this request
    if (
      !isUnauthorized ||
      isRefreshRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshResponse = await authApi.refreshToken();

      tokenManager.setToken(refreshResponse.accessToken);

      return api(originalRequest);
    } catch (refreshError) {
      tokenManager.clearToken();

      return Promise.reject(refreshError);
    }
  }
);
import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { tokenManager } from "../auth/tokenManager";
import { authApi } from "../../../features/auth/api/auth.api";

import { store } from "../../../app/store/store";
import { setUser } from "../../../features/auth/store/authSlice";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  // Vercel proxies production API calls so refresh cookies stay first-party.
  baseURL: import.meta.env.PROD ? "/api/v1" : import.meta.env.VITE_API_BASE_URL,
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

    const isAuthRequest =
      ["/auth/refresh", "/auth/login", "/auth/register"].includes(originalRequest.url ?? "");

    // Don't refresh if:
    // 1. It's not a 401
    // 2. This is a refresh, login, or registration request
    // 3. We already retried this request
    if (
      !isUnauthorized ||
      isAuthRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // A delayed 401 may arrive after another request already refreshed the token.
    const currentToken = tokenManager.getToken();
    if (currentToken && originalRequest.headers.get("Authorization") !== `Bearer ${currentToken}`) {
      return api(originalRequest);
    }

    try {
      const refreshResponse = await authApi.refreshToken();

      tokenManager.setToken(refreshResponse.accessToken);

      return api(originalRequest);
    } catch (refreshError) {
      if (axios.isAxiosError(refreshError) && refreshError.response?.status === 401) {
        tokenManager.clearToken();
        store.dispatch(setUser(null));
      }

      return Promise.reject(refreshError);
    }
  }
);

import { api } from "../../../shared/services/api/axios";
import type { LoginPayload, RegisterPayload } from "../types/auth.types";

export const authApis = {
  register: (data: RegisterPayload) => api.post("/auth/register", data),

  login: (data: LoginPayload) => api.post("/auth/login", data),

  me: () => api.get("/auth/me"),

  logout: () => api.post("/auth/logout"),

  refreshToken: () => api.post("/auth/refresh"),
};

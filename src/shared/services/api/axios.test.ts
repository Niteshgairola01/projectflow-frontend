import {
  AxiosError,
  AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { afterEach, expect, it } from "vitest";
import { api } from "./axios";
import { tokenManager } from "../auth/tokenManager";
import { authApi } from "../../../features/auth/api/auth.api";
import { store } from "../../../app/store/store";
import { queryClient } from "./queryClient";
import { clearSession } from "../auth/clearSession";
import { setCurrentWorkspace } from "../../../features/workspace/store/workspaceSlice";
import { setUser } from "../../../features/auth/store/authSlice";

const originalAdapter = api.defaults.adapter;
afterEach(() => {
  api.defaults.adapter = originalAdapter;
  clearSession();
});
function response(
  config: InternalAxiosRequestConfig,
  data: unknown,
): AxiosResponse {
  return {
    config,
    data,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
  };
}
function unauthorized(config: InternalAxiosRequestConfig) {
  return new AxiosError("Unauthorized", "ERR_BAD_REQUEST", config, undefined, {
    ...response(config, { message: "Refresh token missing" }),
    status: 401,
  });
}

it("shares a refresh across simultaneous expired requests and retries them with the new token", async () => {
  tokenManager.setToken("expired");
  let refreshes = 0;
  api.defaults.adapter = async (config) => {
    if (config.url === "/auth/refresh") {
      refreshes++;
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(config.withCredentials).toBe(true);
      return response(config, { data: { accessToken: "fresh" } });
    }
    if (config.headers.get("Authorization") !== "Bearer fresh")
      throw unauthorized(config);
    return response(config, { ok: true });
  };
  const results = await Promise.all([api.get("/projects"), api.get("/tasks")]);
  expect(results.every((result) => result.data.ok)).toBe(true);
  expect(refreshes).toBe(1);
});

it("reuses the current token for a late 401 without refreshing again", async () => {
  tokenManager.setToken("expired");
  let refreshes = 0;
  api.defaults.adapter = async (config) => {
    if (config.url === "/auth/refresh") {
      refreshes++;
      return response(config, { data: { accessToken: "fresh" } });
    }
    if (config.headers.get("Authorization") === "Bearer expired") {
      if (config.url === "/slow")
        await new Promise((resolve) => setTimeout(resolve, 20));
      throw unauthorized(config);
    }
    return response(config, {});
  };
  await Promise.all([api.get("/fast"), api.get("/slow")]);
  expect(refreshes).toBe(1);
});

it("clears the authenticated UI when the refresh cookie is missing", async () => {
  tokenManager.setToken("expired");
  store.dispatch(
    setUser({ _id: "1", name: "Test", email: "test@example.com" }),
  );
  store.dispatch(setCurrentWorkspace({
    _id: "old-workspace", name: "Old workspace", owner: "1", members: [],
    createdAt: "2026-10-24", updatedAt: "2026-10-24",
  }));
  queryClient.setQueryData(["projects", "old-workspace"], ["old-project"]);
  let refreshes = 0;
  api.defaults.adapter = async (config) => {
    if (config.url === "/auth/refresh") refreshes++;
    throw unauthorized(config);
  };
  await expect(api.get("/projects")).rejects.toThrow("Unauthorized");
  expect(refreshes).toBe(1);
  expect(tokenManager.getToken()).toBeNull();
  expect(store.getState().auth.isAuthenticated).toBe(false);
  expect(store.getState().workspace.currentWorkspace).toBeNull();
  expect(queryClient.getQueryCache().getAll()).toHaveLength(0);
});

it("keeps the session on temporary refresh failures and allows a later attempt", async () => {
  tokenManager.setToken("expired");
  api.defaults.adapter = async (config) => {
    if (config.url === "/auth/refresh")
      throw new AxiosError("Network error", "ERR_NETWORK", config);
    throw unauthorized(config);
  };
  await expect(api.get("/projects")).rejects.toThrow("Network error");
  expect(tokenManager.getToken()).toBe("expired");
  api.defaults.adapter = async (config) =>
    response(config, { data: { accessToken: "fresh" } });
  await authApi.refreshToken();
  expect(tokenManager.getToken()).toBe("fresh");
});

it("does not attempt a refresh for invalid login credentials", async () => {
  const urls: (string | undefined)[] = [];
  api.defaults.adapter = async (config) => {
    urls.push(config.url);
    throw unauthorized(config);
  };
  await expect(
    authApi.login({ email: "test@example.com", password: "wrong" }),
  ).rejects.toThrow();
  expect(urls).toEqual(["/auth/login"]);
});

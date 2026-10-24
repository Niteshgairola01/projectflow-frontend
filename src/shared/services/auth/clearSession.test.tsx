import { act, cleanup, renderHook } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { store } from "../../../app/store/store";
import { setUser } from "../../../features/auth/store/authSlice";
import { setCurrentWorkspace } from "../../../features/workspace/store/workspaceSlice";
import { authApi } from "../../../features/auth/api/auth.api";
import { useLogout } from "../../../features/auth/hooks/useLogout";
import { queryClient } from "../api/queryClient";
import { tokenManager } from "./tokenManager";
import { clearSession } from "./clearSession";

beforeEach(() => {
  store.dispatch(setUser({ _id: "account-a", name: "A", email: "a@example.com" }));
  store.dispatch(setCurrentWorkspace({
    _id: "workspace-a", name: "Workspace A", owner: "account-a", members: [],
    createdAt: "2026-10-24", updatedAt: "2026-10-24",
  }));
  tokenManager.setToken("token-a");
  queryClient.setQueryData(["projects", "list", "workspace-a"], [{ _id: "project-a" }]);
});
afterEach(() => { cleanup(); clearSession(); vi.restoreAllMocks(); });

it("clears the previous account's workspace and cache on successful logout", async () => {
  vi.spyOn(authApi, "logout").mockResolvedValue();
  const { result } = renderHook(() => useLogout(), {
    wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  });
  await act(async () => { await result.current.mutateAsync(); });
  expect(tokenManager.getToken()).toBeNull();
  expect(store.getState().auth.user).toBeNull();
  expect(store.getState().workspace.currentWorkspace).toBeNull();
  expect(queryClient.getQueryCache().getAll()).toHaveLength(0);
  store.dispatch(setUser({ _id: "account-b", name: "B", email: "b@example.com" }));
  expect(store.getState().workspace.currentWorkspace).toBeNull();
  expect(queryClient.getQueryData(["projects", "list", "workspace-a"])).toBeUndefined();
});

it("does not discard the active session when the logout request fails", async () => {
  vi.spyOn(authApi, "logout").mockRejectedValue(new Error("Network error"));
  const { result } = renderHook(() => useLogout(), {
    wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  });
  await act(async () => { await expect(result.current.mutateAsync()).rejects.toThrow("Network error"); });
  expect(tokenManager.getToken()).toBe("token-a");
  expect(store.getState().workspace.currentWorkspace?._id).toBe("workspace-a");
});

it("prevents pending query results from restoring the previous account's cache", async () => {
  let resolveRequest!: (value: string[]) => void;
  const request = new Promise<string[]>((resolve) => { resolveRequest = resolve; });
  const pending = queryClient.fetchQuery({ queryKey: ["old-account-request"], queryFn: () => request });
  // Cache removal cancels the query promise even if its transport ignores cancellation.
  const cancelled = pending.catch(() => undefined);
  clearSession();
  resolveRequest(["private-result"]);
  await cancelled;
  await request;
  expect(queryClient.getQueryCache().getAll()).toHaveLength(0);
});

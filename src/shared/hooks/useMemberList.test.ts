import { createElement, type ReactNode } from "react";
import { act, renderHook, waitFor, cleanup } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, expect, it, vi } from "vitest";
import { useMemberList } from "./useMemberList";
import { api } from "../services/api/axios";

vi.mock("../services/api/axios", () => ({ api: { get: vi.fn() } }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });
function wrapper({ children }: { children: ReactNode }) {
  return createElement(QueryClientProvider, { client: new QueryClient({ defaultOptions: { queries: { retry: false } } }) }, children);
}

it("requests server pages, debounces search, and resets page on search", async () => {
  vi.mocked(api.get).mockResolvedValue({ data: { data: { members: [{ user: { name: "Server result" } }], total: 21, totalMembers: 21, page: 1, totalPages: 3, limit: 10 } } });
  const { result } = renderHook(() => useMemberList("/workspaces/one/members", ["members"]), { wrapper });
  await waitFor(() => expect(result.current.members).toHaveLength(1));
  expect(api.get).toHaveBeenCalledWith("/workspaces/one/members", expect.objectContaining({ params: { search: "", page: 1, limit: 10 } }));
  vi.mocked(api.get).mockResolvedValue({ data: { data: { members: [], total: 21, totalMembers: 21, page: 3, totalPages: 3, limit: 10 } } });
  act(() => result.current.setPage(3));
  await waitFor(() => expect(api.get).toHaveBeenLastCalledWith(expect.anything(), expect.objectContaining({ params: { search: "", page: 3, limit: 10 } })));
  act(() => result.current.setSearch(" Alice "));
  expect(result.current.page).toBe(1);
  vi.mocked(api.get).mockResolvedValue({ data: { data: { members: [], total: 0, totalMembers: 21, page: 1, totalPages: 1, limit: 10 } } });
  await waitFor(() => expect(api.get).toHaveBeenLastCalledWith(expect.anything(), expect.objectContaining({ params: { search: "Alice", page: 1, limit: 10 } })));
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.total).toBe(0);
});

it("uses the server's corrected page after a deletion and resets on context change", async () => {
  vi.mocked(api.get).mockImplementation(async (_url, config) => ({ data: { data: {
    members: [], total: 20, totalMembers: 20,
    page: Math.min(config?.params.page ?? 1, 2), totalPages: 2, limit: 10,
  } } }));
  const { result, rerender } = renderHook(({ endpoint }) => useMemberList(endpoint, [endpoint]), {
    initialProps: { endpoint: "/workspaces/one/members" }, wrapper,
  });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  act(() => result.current.setPage(3));
  await waitFor(() => expect(result.current.page).toBe(2));
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  rerender({ endpoint: "/workspaces/two/members" });
  expect(result.current.page).toBe(1);
  expect(result.current.search).toBe("");
  await waitFor(() => expect(api.get).toHaveBeenLastCalledWith("/workspaces/two/members", expect.objectContaining({ params: { search: "", page: 1, limit: 10 } })));
});

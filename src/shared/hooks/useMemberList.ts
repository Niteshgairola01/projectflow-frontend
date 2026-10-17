import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api/axios";
import type { ApiResponse } from "../types/api.types";

export interface MemberPage<T> {
  members: T[];
  total: number;
  totalMembers: number;
  page: number;
  totalPages: number;
  limit: number;
}

export function useMemberList<T>(endpoint: string, queryKey: readonly unknown[]) {
  const [state, setState] = useState({ endpoint, search: "", page: 1 });
  const search = state.endpoint === endpoint ? state.search : "";
  const requestedPage = state.endpoint === endpoint ? state.page : 1;
  const [debounced, setDebounced] = useState({ endpoint, search });
  useEffect(() => {
    const timer = setTimeout(() => setDebounced({ endpoint, search }), 300);
    return () => clearTimeout(timer);
  }, [endpoint, search]);
  const pendingSearch = debounced.endpoint !== endpoint || debounced.search !== search;
  const query = useQuery({
    queryKey: [...queryKey, "page", { search: search.trim(), page: requestedPage }],
    queryFn: async ({ signal }) => {
      const response = await api.get<ApiResponse<MemberPage<T>>>(endpoint, {
        params: { search: search.trim(), page: requestedPage, limit: 10 }, signal,
      });
      return response.data.data;
    },
    enabled: !pendingSearch,
  });
  const data = query.data;
  const page = data?.page ?? requestedPage;
  // The API clamps pages after deletions; persist that page for subsequent searches/refetches.
  if (state.endpoint !== endpoint || (data && state.page !== data.page)) {
    setState({ endpoint, search, page });
  }
  const total = data?.total ?? 0;
  return {
    search,
    setSearch: (value: string) => setState({ endpoint, search: value, page: 1 }),
    page,
    setPage: (value: number) => setState({ endpoint, search, page: Math.max(1, value) }),
    totalPages: data?.totalPages ?? 1,
    total,
    totalMembers: data?.totalMembers ?? 0,
    start: total ? (page - 1) * 10 + 1 : 0,
    end: Math.min(page * 10, total),
    members: data?.members ?? [],
    isLoading: pendingSearch || query.isPending,
    isError: query.isError,
  };
}

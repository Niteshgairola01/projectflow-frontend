import { useQuery } from "@tanstack/react-query";
import { workspaceApi } from "../api/workspace.api";
import { queryKeys } from "../../../shared/constants/queryKeys";

export const useWorkspace = (id?: string) => {
  return useQuery({
    queryFn: () => {
      if (!id) throw new Error("Workspace not found");
      return workspaceApi.getWorkspaceById(id);
    },
    queryKey: queryKeys.workspace.detail(id ?? ""),
    enabled: !!id,
  });
};

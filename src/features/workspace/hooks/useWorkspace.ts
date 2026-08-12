import { useQuery } from "@tanstack/react-query";
import { workspaceApi } from "../api/workspace.api";

export const useWorkspace = (id?: string) => {
  return useQuery({
    queryFn: () => workspaceApi.getWorkspaceById(id),
    queryKey: ["workspaces", id],
    enabled: !!id,
  });
};

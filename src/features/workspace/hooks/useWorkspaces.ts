import { useQuery } from "@tanstack/react-query";
import { workspaceApi } from "../api/workspace.api";

export const useWorkspaces = () => {
  return useQuery({
    queryFn: workspaceApi.getWorkspaces,
    queryKey: ["workspaces"],
  });
};

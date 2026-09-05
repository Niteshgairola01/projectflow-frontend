import { useQuery } from "@tanstack/react-query";
import { workspaceApi } from "../api/workspace.api";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

export const useWorkspaces = () => {
  const { user } = useAppSelector((state) => state.auth);

  return useQuery({
    queryFn: workspaceApi.getWorkspaces,
    queryKey: ["workspaces", user?._id ?? ""],
  });
};

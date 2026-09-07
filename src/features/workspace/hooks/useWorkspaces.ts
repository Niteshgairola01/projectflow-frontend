import { useQuery } from "@tanstack/react-query";
import { workspaceApi } from "../api/workspace.api";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { queryKeys } from "../../../shared/constants/queryKeys";

export const useWorkspaces = () => {
  const { user } = useAppSelector((state) => state.auth);

  return useQuery({
    queryFn: workspaceApi.getWorkspaces,
    queryKey: queryKeys.workspace.list(user?._id ?? ""),
  });
};

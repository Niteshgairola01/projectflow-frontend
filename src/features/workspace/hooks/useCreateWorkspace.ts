import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceApi } from "../api/workspace.api";
import { notify } from "../../../shared/utils/toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import type { CreateWorkspacePayload } from "../schema/createWorkspaceSchema";
import { queryKeys } from "../../../shared/constants/queryKeys";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

export const useCreateWorkspace = () => {
  const { user } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: (payload: CreateWorkspacePayload) => {
      if (!can(PERMISSIONS.WORKSPACE_CREATE)) throw new Error("Access denied");
      return workspaceApi.createWorkspace(payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.workspace.list(user?._id ?? ""),
      });

      notify.success("workspace created successfully");
    },

    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
};

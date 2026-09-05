import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceMemberApi } from "../api/workspaceMember.api";
import { useParams } from "react-router-dom";

export const useRemoveWorkspaceMember = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => {
      return workspaceMemberApi.removeWorkspaceMemberRole(
        workspaceId,
        memberId,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces", workspaceId],
      });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceMemberApi } from "../api/workspaceMember.api";
import { useParams } from "react-router-dom";
import type { UpdateWorkspaceMemberRolePayload } from "../schema/updateWorkspaceMemberRoleSchema";

interface MemberVariables {
  memberId: string;
  data: UpdateWorkspaceMemberRolePayload;
}

export const useUpdateWorkspaceMemberRole = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, data }: MemberVariables) => {
      return workspaceMemberApi.updateWorkspaceMemberRole(
        workspaceId,
        memberId,
        data,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces", workspaceId],
      });
    },
  });
};

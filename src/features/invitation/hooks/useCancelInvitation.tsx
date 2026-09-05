import { useQueryClient, useMutation } from "@tanstack/react-query";
import { invitaitonApis } from "../api/invitation.api";
import { useParams } from "react-router-dom";
import { invitationKeys } from "../constants/invitation.keys";

export const useCancelInvitation = () => {
  const { workspaceId } = useParams();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => {
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      return invitaitonApis.cancelInvitation(workspaceId, invitationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invitationKeys.workspaceLists(workspaceId ?? ""),
      });
    },
  });
};

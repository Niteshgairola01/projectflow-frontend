import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { CreateInvitationPayload } from "../schema/invitationSchema";
import { invitaitonApis } from "../api/invitation.api";
import { invitationKeys } from "../constants/invitation.keys";

export const useCreateInvitation = () => {
  const queryClient = useQueryClient();
  const { workspaceId } = useParams();

  return useMutation({
    mutationFn: (payload: CreateInvitationPayload) => {
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      return invitaitonApis.createInvitaion(workspaceId, payload);
    },

    onSuccess: () => {
      if (!workspaceId) return;

      queryClient.invalidateQueries({
        queryKey: invitationKeys.workspaceLists(workspaceId),
      });
    },
  });
};

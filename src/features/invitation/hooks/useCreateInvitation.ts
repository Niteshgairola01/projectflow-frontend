import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { CreateInvitationPayload } from "../schema/invitationSchema";
import { invitaitonApis } from "../api/invitation.api";
import { invitationKeys } from "../constants/invitation.keys";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

export const useCreateInvitation = () => {
  const queryClient = useQueryClient();
  const { workspaceId } = useParams();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: (payload: CreateInvitationPayload) => {
      if (!can(PERMISSIONS.INVITATION_CREATE)) throw new Error("Access denied");
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

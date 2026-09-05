import { useQueryClient, useMutation } from "@tanstack/react-query";
import { invitaitonApis } from "../api/invitation.api";
import { useParams } from "react-router-dom";
import { invitationKeys } from "../constants/invitation.keys";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

export const useCancelInvitation = () => {
  const { workspaceId } = useParams();
  const { can } = usePermissions();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => {
      if (!can(PERMISSIONS.INVITATION_CANCEL)) throw new Error("Access denied");
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

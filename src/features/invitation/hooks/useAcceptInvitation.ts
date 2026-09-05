import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invitationKeys } from "../constants/invitation.keys";
import { invitaitonApis } from "../api/invitation.api";

interface Variables {
  workspaceId: string;
  token: string;
}

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, token }: Variables) => {
      return invitaitonApis.acceptInvitation(workspaceId, token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invitationKeys.all,
      });

      // Accepting an invitation
      // Changes user's workspace membership.
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });
};

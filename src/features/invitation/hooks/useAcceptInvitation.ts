import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invitationKeys } from "../constants/invitation.keys";
import { invitaitonApis } from "../api/invitation.api";
import { queryKeys } from "../../../shared/constants/queryKeys";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

interface Variables {
  workspaceId: string;
  token: string;
}

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.auth);

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
        queryKey: queryKeys.workspace.list(user?._id ?? ""),
      });
    },
  });
};

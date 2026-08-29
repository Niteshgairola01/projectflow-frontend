import { useQuery } from "@tanstack/react-query";
import { invitaitonApis } from "../api/invitation.api";
import { useParams } from "react-router-dom";
import { invitationKeys } from "../constants/invitation.keys";

export const useGetInvitations = () => {
  const { workspaceId } = useParams();

  return useQuery({
    queryKey: invitationKeys.workspaceLists(workspaceId),
    queryFn: () => {
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      return invitaitonApis.getWorkspaceInvitations(workspaceId);
    },
  });
};

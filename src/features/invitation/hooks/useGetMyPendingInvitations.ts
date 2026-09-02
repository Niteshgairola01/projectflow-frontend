import { useQuery } from "@tanstack/react-query";
import { invitaitonApis } from "../api/invitation.api";
import { invitationKeys } from "../constants/invitation.keys";

export const useGetMyPendingInvitations = () => {
  return useQuery({
    queryKey: invitationKeys.myPending(),
    queryFn: async () => {
      return await invitaitonApis.getMyPendingInvitations();
    },
  });
};

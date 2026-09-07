import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { invitaitonApis } from "../api/invitation.api";
import { invitationKeys } from "../constants/invitation.keys";

export const useGetInvitationByToken = () => {
  const { token } = useParams();

  return useQuery({
    queryKey: invitationKeys.byToken(token ?? ""),
    queryFn: () => {
      if (!token) throw new Error("Invitation not found");
      return invitaitonApis.getInvitationByToken(token);
    },
    enabled: !!token,
    retry: false,
  });
};

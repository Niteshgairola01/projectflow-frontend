import { useMutation } from "@tanstack/react-query";
import { clearSession } from "../../../shared/services/auth/clearSession";
import { authApi } from "../api/auth.api";

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: clearSession,
  });
};

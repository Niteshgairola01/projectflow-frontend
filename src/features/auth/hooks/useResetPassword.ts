import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
    retry: false,
  });
};

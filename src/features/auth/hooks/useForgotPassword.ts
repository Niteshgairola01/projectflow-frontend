import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    retry: false,
  });
};

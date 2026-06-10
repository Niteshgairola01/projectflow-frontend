import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { notify } from "../../../shared/utils/toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,

    onSuccess: () => {
      notify.success("Logged in successfully");
    },

    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
};

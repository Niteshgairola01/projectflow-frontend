import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { notify } from "../../../shared/utils/toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,

    onSuccess: () => {
      notify.success("Regsitered successfully");
    },

    onError: (error) => {
      notify.error(getErrorMessage(error));
    },
  });
};

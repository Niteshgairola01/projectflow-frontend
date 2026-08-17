import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { notify } from "../../../shared/utils/toast";

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryFn: () => {
      if (!userId) {
        notify.error("User not found");
        return;
      }

      return authApi.getUserById(userId);
    },
    queryKey: ["userById", userId],
  });
};

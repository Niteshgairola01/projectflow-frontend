import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { notify } from "../../../shared/utils/toast";

export const useGetUserById = (userId?: string) => {
  return useQuery({
    queryFn: () => {
      if (!userId) {
        notify.error("User not found");
        throw new Error("User not found");
      }

      return authApi.getUserById(userId);
    },
    queryKey: ["userById", userId],
    enabled: !!userId,
  });
};

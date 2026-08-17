import { useEffect, useState, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { authApi } from "../api/auth.api";
import { tokenManager } from "../../../shared/services/auth/tokenManager";
import { setUser } from "../store/authSlice";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";

interface Props {
  children: ReactNode;
}

export const AuthInitializer = ({ children }: Props) => {
  const dispatch = useDispatch();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const refreshTokenResponse = await authApi.refreshToken();

        tokenManager.setToken(refreshTokenResponse.accessToken);

        const meResponse = await authApi.me();

        dispatch(setUser(meResponse));
      } catch (error) {
        console.log("No active session");
        tokenManager.clearToken();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (isInitializing) {
    return <AppLoader message="Loading your workspace..."/>;
  }

  return <>{children}</>;
};

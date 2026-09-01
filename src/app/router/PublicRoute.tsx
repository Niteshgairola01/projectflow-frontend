import type { ReactNode } from "react";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { Navigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  const invitationToken = searchParams.get("invitation");

  if (user) {
    if (invitationToken) {
      return <Navigate to={`/invitations/${invitationToken}`} replace />;
    }

    return <Navigate to={ROUTES.WORKSPACES} replace />;
  }

  return <>{children}</>;
};

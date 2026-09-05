import { Button } from "../../../shared/components/ui/Button/Button";
import { ArrowRight } from "lucide-react";
import type { User } from "../../auth/types/auth.types";
import { useNavigate, useParams } from "react-router-dom";
import { useAcceptInvitation } from "../hooks/useAcceptInvitation";
import type { Invitation } from "../types/invitation.types";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";
import { ROUTES } from "../../../shared/constants/routes";

interface LoggedInWithCorrectAccountProps {
  invitation: Invitation;
  user: User;
}

const LoggedInWithCorrectAccount = ({
  invitation,
  user,
}: LoggedInWithCorrectAccountProps) => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { mutateAsync, isPending } = useAcceptInvitation();

  const handleAcceptInvitation = async () => {
    try {
      await mutateAsync(
        { workspaceId: invitation.workspace?._id, token },
        {
          onSuccess: () => {
            notify.success("Invitation accepted");
            navigate(ROUTES.WORKSPACES);
          },
        },
      );
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  return (
    <>
      <Button
        className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold"
        onClick={handleAcceptInvitation}
        disabled={isPending}
      >
        Accept Invitation
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>

      <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
        Signed in as{" "}
        <span className="font-medium text-foreground">{user?.email}</span>
      </p>
    </>
  );
};

export default LoggedInWithCorrectAccount;

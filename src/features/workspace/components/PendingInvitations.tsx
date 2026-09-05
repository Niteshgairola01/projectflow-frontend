import { ArrowRight, Mail } from "lucide-react";
import { Button } from "../../../shared/components/ui/Button/Button";
import { useGetMyPendingInvitations } from "../../invitation/hooks/useGetMyPendingInvitations";
import { formatDate } from "../../../shared/utils/formateDate";
import { Card } from "../../../shared/components/ui/Card/Card";
import { useNavigate } from "react-router-dom";
import { useAcceptInvitation } from "../../invitation/hooks/useAcceptInvitation";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";

const PendingInvitations = () => {
  const navigate = useNavigate();
  const { data: invitations } = useGetMyPendingInvitations();

  const { mutateAsync, isPending } = useAcceptInvitation();

  if (!invitations) {
    return;
  }

  const handleViewDetails = (token: string) => {
    navigate(`/invitations/${token}`);
  };

  const handleAcceptInvitation = async (workspaceId: string, token: string) => {
    try {
      await mutateAsync({ workspaceId, token });
      notify.success("Invitation accepted successfully");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  return (
    <Card className="mt-3">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                Pending Invitations
              </h2>

              <span className="flex min-w-6 items-center justify-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {invitations.length}
              </span>
            </div>

            {invitations.length > 0 ? (
              <p className={`mt-1 text-sm text-red-400`}>
                You have {invitations.length} pending workspace invitations.
              </p>
            ) : (
              <p className={`mt-1 text-sm text-muted-foreground`}>
                You do not have any pending workspace invitation.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Invitations */}
      <div className="divide-y">
        {invitations.map((invitation) => (
          <div
            key={invitation._id}
            className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-muted/20 lg:flex-row lg:items-center lg:justify-between"
          >
            {/* Left */}
            <div className="flex min-w-0 items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white shadow-sm"
                style={{
                  backgroundColor: invitation.workspace.color || "#6C63FF",
                }}
              >
                {invitation.workspace.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {invitation.workspace.name}
                </p>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  Invited by{" "}
                  <span className="font-medium text-foreground">
                    {invitation.invitedBy.name}
                  </span>
                  <span className="hidden md:inline">
                    {" "}
                    ({invitation.invitedBy.email})
                  </span>
                </p>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <span>Role: Member</span>

                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />

                  <span>
                    Expires on{" "}
                    <span className="font-medium text-primary">
                      {formatDate(invitation.expiresAt)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2 pl-16 lg:pl-0">
              <button
                type="button"
                className="h-12 rounded-lg border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => handleViewDetails(invitation.token)}
              >
                View Details
              </button>

              <Button
                className="inline-flex h-9 items-center gap-2 rounded-lg px-4"
                onClick={() =>
                  handleAcceptInvitation(
                    invitation.workspace._id,
                    invitation.token,
                  )
                }
                disabled={isPending}
              >
                Accept
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PendingInvitations;

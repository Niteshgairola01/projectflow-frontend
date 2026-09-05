import { Mail } from "lucide-react";
import type { Invitation } from "../../invitation/types/invitation.types";
import { Card } from "../../../shared/components/ui/Card/Card";

interface WorkspaceInvitationPageSummarySectionProps {
  invitations: Invitation[];
}

const WorkspaceInvitationPageSummarySection = ({
  invitations,
}: WorkspaceInvitationPageSummarySectionProps) => {
  const pendingInvitations = invitations?.filter(
    (invitation) => invitation.status === "PENDING",
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-card p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Mail className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Pending Invitations</p>

            <p className="mt-0.5 text-2xl font-semibold text-foreground">
              {pendingInvitations?.length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkspaceInvitationPageSummarySection;

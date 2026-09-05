import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateInvitationForm from "../../invitation/components/CreateInvitationForm";
import Can from "../../../shared/components/auth/Can";
import { Button } from "../../../shared/components/ui/Button/Button";
import { PERMISSIONS } from "../../../shared/constants/permissions";

const WorkspaceInvitationPageHeader = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {/* Navigation functionality can be added later */}
          <button
            type="button"
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to workspace
          </button>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Invitations
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track invitations that are waiting to be accepted.
          </p>
        </div>

        <Can permission={PERMISSIONS.INVITATION_CREATE}>
          <Button
            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap sm:w-auto"
            onClick={() => setIsCreateOpen(true)}
          >
            <Send className="h-4 w-4 shrink-0" />
            Invite Member
          </Button>
        </Can>
      </div>

      {/* Create Invitation Modal */}
      <CreateInvitationForm
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(!isCreateOpen)}
      />
    </>
  );
};

export default WorkspaceInvitationPageHeader;

import { Mail, Plus, Search, Users } from "lucide-react";
import Can from "../../../shared/components/auth/Can";
import { Button } from "../../../shared/components/ui/Button/Button";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import { Input } from "../../../shared/components/ui/Input/Input";
import CreateInvitationForm from "../../invitation/components/CreateInvitationForm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WorkspaceMembersListHeader = () => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  return (
    <div className="flex flex-col gap-4 border-b px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 shrink-0 text-primary" />

          <h2 className="truncate font-semibold text-foreground">
            Workspace Members
          </h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage members and their roles in this workspace.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
        <div className="relative w-full sm:min-w-56 sm:flex-1 lg:w-64 lg:flex-none">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input className="w-full pl-9" placeholder="Search members..." />
        </div>

        <div className="flex w-full flex-col justify-end gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          {/* Invitations */}
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 sm:w-auto"
            onClick={() =>
              navigate(`/workspaces/${workspaceId}/invitations/pending`)
            }
          >
            <Mail size={17} className="shrink-0" />

            <span>Invitations</span>

            <span className="ml-1 shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
              3
            </span>
          </button>

          {/* Invite members */}
          <Can permission={PERMISSIONS.INVITATION_CREATE}>
            <Button
              className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap sm:w-auto"
              onClick={() => setIsCreateOpen(true)}
            >
              <Plus className="h-4 w-4 shrink-0" />
              Invite Member
            </Button>
          </Can>
        </div>
      </div>

      {/* Create Invitation Modal */}
      <CreateInvitationForm
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(!isCreateOpen)}
      />
    </div>
  );
};

export default WorkspaceMembersListHeader;

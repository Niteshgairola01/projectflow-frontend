import MemberSearch from "../../../shared/components/members/MemberSearch";
import { Mail, Plus, Users } from "lucide-react";
import Can from "../../../shared/components/auth/Can";
import { Button } from "../../../shared/components/ui/Button/Button";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import CreateInvitationForm from "../../invitation/components/CreateInvitationForm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WorkspaceMembersListHeader = ({ search, onSearchChange, total }: { search: string; onSearchChange: (value: string) => void; total: number }) => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  return (
    <div className="flex flex-col gap-4 border-b px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 shrink-0 text-primary" />

          <h2 className="truncate font-semibold text-foreground">
            Workspace Members ({total})
          </h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage members and their roles in this workspace.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
        <MemberSearch value={search} onChange={onSearchChange} />

        <div className="flex w-full flex-col justify-end gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          {/* Invitations */}
          <Can permission={PERMISSIONS.INVITATION_CREATE}>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 sm:w-auto"
              onClick={() =>
                navigate(`/workspaces/${workspaceId}/invitations/pending`)
              }
            >
              <Mail size={17} className="shrink-0" />
              <span>Invitations</span>

            </button>
          </Can>

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

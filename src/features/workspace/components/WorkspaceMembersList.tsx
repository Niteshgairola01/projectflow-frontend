import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mail, MoreHorizontal, Plus, Search, Users } from "lucide-react";
import type { WorkspaceMember, WorkspaceProps } from "../types/workspace.types";
import WorkspaceMemberBadge from "./WorkspaceMemberBadge";
import { Button } from "../../../shared/components/ui/Button/Button";
import { Input } from "../../../shared/components/ui/Input/Input";
import { Card } from "../../../shared/components/ui/Card/Card";
import CreateInvitationForm from "../../invitation/components/CreateInvitationForm";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";

const WorkspaceMembersList = ({ workspace }: WorkspaceProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  return (
    <Card className="w-full overflow-hidden">
      {/* Header */}
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
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground sm:px-6">
                Member
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground sm:px-6">
                Role
              </th>

              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground sm:px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {workspace.members?.map((member: WorkspaceMember) => {
              const name = member?.user?.name ?? "";
              const email = member?.user?.email ?? "";

              return (
                <tr
                  key={member?.user?._id}
                  className="transition-colors hover:bg-muted/30"
                >
                  {/* Member */}
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold uppercase text-primary">
                        {name.slice(0, 1)}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-48 truncate text-sm font-medium text-foreground sm:max-w-64 lg:max-w-none">
                          {name}
                        </p>

                        <p className="mt-0.5 max-w-48 truncate text-sm text-muted-foreground sm:max-w-64 lg:max-w-none">
                          {email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                    <WorkspaceMemberBadge role={member.role} />
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap px-4 py-4 text-right sm:px-6">
                    {member.role !== "OWNER" && (
                      <button
                        type="button"
                        aria-label={`Manage ${name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/20 px-4 py-3 sm:px-6">
        <p className="text-sm text-muted-foreground">
          {workspace.members?.length ?? 0}{" "}
          {(workspace.members?.length ?? 0) === 1 ? "member" : "members"}
        </p>
      </div>

      {/* Create Invitation Modal */}
      <CreateInvitationForm
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(!isCreateOpen)}
      />
    </Card>
  );
};

export default WorkspaceMembersList;

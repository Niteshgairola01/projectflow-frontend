import { MoreHorizontal, Users } from "lucide-react";
import { Card } from "../../../shared/components/ui/Card/Card";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import ProjectMemberBadge from "./ProjectMemberBadge";

import type { WorkspaceMember } from "../../workspace/types/workspace.types";
import { useProjectMembers } from "../hooks/useProjecMembers";
import ProjectMembersHeader from "./ProjectMembersHeader";

interface ProjectMembersListProps {
  workspaceMembers: WorkspaceMember[];
}

const ProjectMembersList = ({ workspaceMembers }: ProjectMembersListProps) => {
  const { data: projectMembers = [], isLoading } = useProjectMembers();

  if (isLoading) {
    return (
      <Card className="p-6">
        <AppLoader message="Loading project members..." />
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full overflow-hidden">
        {/* Header */}
        <ProjectMembersHeader
          workspaceMembers={workspaceMembers}
          projectMembers={projectMembers}
        />
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
              {projectMembers?.map((member) => {
                const name = member.user?.name ?? "";
                const email = member.user?.email ?? "";

                return (
                  <tr
                    key={member.user?._id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold uppercase text-primary">
                          {name.slice(0, 1)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {name}
                          </p>

                          <p className="mt-0.5 truncate text-sm text-muted-foreground">
                            {email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 sm:px-6">
                      <ProjectMemberBadge role={member.role} />
                    </td>

                    <td className="px-4 py-4 text-right sm:px-6">
                      <button
                        type="button"
                        aria-label={`Manage ${name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {projectMembers?.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-foreground">
                No project members
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Add workspace members to start collaborating on this project.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {projectMembers?.length > 0 && (
          <div className="border-t bg-muted/20 px-4 py-3 sm:px-6">
            <p className="text-sm text-muted-foreground">
              {projectMembers?.length}{" "}
              {projectMembers?.length === 1 ? "member" : "members"}
            </p>
          </div>
        )}
      </Card>
    </>
  );
};

export default ProjectMembersList;

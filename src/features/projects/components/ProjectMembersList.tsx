import { projectMemberKeys } from "../constants/projectMember..keys";
import type { ProjectMember } from "../types/projectMember.types";
import { useMemberList } from "../../../shared/hooks/useMemberList";
import MemberPagination from "../../../shared/components/members/MemberPagination";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Users } from "lucide-react";

import { Card } from "../../../shared/components/ui/Card/Card";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import ProjectMembersHeader from "./ProjectMembersHeader";
import ProjectMembersListItem from "./ProjectMembersListItem";

import type { WorkspaceMember } from "../../workspace/types/workspace.types";

import { useProjectMembers } from "../hooks/useProjecMembers";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

interface ProjectMembersListProps {
  workspaceMembers: WorkspaceMember[];
}

const ProjectMembersList = ({ workspaceMembers }: ProjectMembersListProps) => {
  const [openMenuForMemberId, setOpenMenuForMemberId] = useState<string | null>(
    null,
  );
  const { user: loggedInUser } = useAppSelector((state) => state.auth);

  const { data: projectMembers = [], isLoading, isError } = useProjectMembers();

  const { workspaceId, projectId } = useParams();
  const list = useMemberList<ProjectMember>(`/workspaces/${workspaceId}/projects/${projectId}/members`, projectMemberKeys.list(workspaceId ?? "", projectId ?? ""));

  if (isLoading) {
    return (
      <Card className="p-6">
        <AppLoader message="Loading project members..." />
      </Card>
    );
  }

  if (isError) return <Card className="p-6">Failed to load project members. Please try again.</Card>;

  const loggedInUserRole =
    workspaceMembers.find((member) => member.user?._id === loggedInUser?._id)
      ?.role || null;

  const handleToggleMenu = (memberId: string) => {
    setOpenMenuForMemberId((current) =>
      current === memberId ? null : memberId,
    );
  };

  const handleCloseMenu = () => {
    setOpenMenuForMemberId(null);
  };

  return (
    <Card className="w-full overflow-hidden">
      <ProjectMembersHeader
        workspaceMembers={workspaceMembers}
        projectMembers={projectMembers}
        search={list.search}
        onSearchChange={list.setSearch}
      />

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
            {!list.isLoading && !list.isError && list.members.map((member) => (
              <ProjectMembersListItem
                key={member.user._id}
                member={member}
                loggedInUserRole={loggedInUserRole}
                isMenuOpen={openMenuForMemberId === member.user._id}
                onToggleMenu={() => handleToggleMenu(member.user._id)}
                onCloseMenu={handleCloseMenu}
              />
            ))}
          </tbody>
        </table>

        {list.isLoading && <p className="p-6">Loading members…</p>}
        {list.isError && <p className="p-6">Failed to load members. Please try again.</p>}
        {!list.isLoading && !list.isError && list.total === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-foreground">
              {projectMembers.length ? "No members match your search" : "No project members"}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {projectMembers.length ? "Try a different name or email, or clear your search." : "Add workspace members to start collaborating on this project."}
            </p>
          </div>
        )}
      </div>

      {!list.isLoading && !list.isError && <MemberPagination {...list} onPageChange={list.setPage} />}

    </Card>
  );
};

export default ProjectMembersList;

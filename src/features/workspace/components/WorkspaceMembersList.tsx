import { queryKeys } from "../../../shared/constants/queryKeys";
import { useMemberList } from "../../../shared/hooks/useMemberList";
import MemberPagination from "../../../shared/components/members/MemberPagination";
import type { WorkspaceMember, WorkspaceProps } from "../types/workspace.types";
import { Card } from "../../../shared/components/ui/Card/Card";
import WorkspaceMembersListItem from "./WorkspaceMembersListItem";
import WorkspaceMembersListHeader from "./WorkspaceMembersListHeader";
import { useState } from "react";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

const WorkspaceMembersList = ({ workspace }: WorkspaceProps) => {
  const [openMenuForMemberId, setOpenMenuForMemberId] = useState<string | null>(
    null,
  );
  const list = useMemberList<WorkspaceMember>(`/workspaces/${workspace._id}/members`, [...queryKeys.workspace.detail(workspace._id), "members"]);
  const { user: loggedInUser } = useAppSelector((state) => state.auth);

  const loggedInUserRole =
    workspace?.members?.find((member) => member.user?._id === loggedInUser?._id)
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
      {/* Header */}
      <WorkspaceMembersListHeader search={list.search} onSearchChange={list.setSearch} total={workspace.members.length} />

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
            {!list.isLoading && !list.isError && list.members.map((member: WorkspaceMember) => {
              return (
                <WorkspaceMembersListItem
                  key={member.user?._id}
                  member={member}
                  loggedInUserRole={loggedInUserRole}
                  isMenuOpen={openMenuForMemberId === member.user._id}
                  onToggleMenu={() => handleToggleMenu(member.user._id)}
                  onCloseMenu={handleCloseMenu}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {list.isLoading && <p className="p-6">Loading members…</p>}
      {list.isError && <p className="p-6">Failed to load members. Please try again.</p>}
      {!list.isLoading && !list.isError && !list.total && <p className="px-6 py-12 text-center text-muted-foreground">{workspace.members.length ? "No members match your search. Try a different name or email." : "No workspace members."}</p>}
      {!list.isLoading && !list.isError && <MemberPagination {...list} onPageChange={list.setPage} />}

    </Card>
  );
};

export default WorkspaceMembersList;

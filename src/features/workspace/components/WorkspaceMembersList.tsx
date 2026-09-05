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
      <WorkspaceMembersListHeader />

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

      {/* Footer */}
      <div className="border-t bg-muted/20 px-4 py-3 sm:px-6">
        <p className="text-sm text-muted-foreground">
          {workspace.members?.length ?? 0}{" "}
          {(workspace.members?.length ?? 0) === 1 ? "member" : "members"}
        </p>
      </div>
    </Card>
  );
};

export default WorkspaceMembersList;

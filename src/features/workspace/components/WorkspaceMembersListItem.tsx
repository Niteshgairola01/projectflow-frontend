import { Edit, MoreHorizontal, Trash } from "lucide-react";
import WorkspaceMemberBadge from "./WorkspaceMemberBadge";
import type {
  WorkspaceMember,
  WorkspaceMemberRole,
} from "../types/workspace.types";
import { useState } from "react";
import WorkspaceMemberRoleUpdateModal from "./WorkspaceMemberRoleUpdateModal";
import { canManageWorkspaceMember } from "../utils/canManageWorkspaceMember";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import ConfirmModal from "../../../shared/components/ui/Modal/ConfirmModal";
import { useRemoveWorkspaceMember } from "../hooks/useRemoveWorkspaceMember";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";

interface WorkspaceMembersListItemProps {
  member: WorkspaceMember;
  loggedInUserRole: WorkspaceMemberRole | null;
  isMenuOpen: boolean;
  onToggleMenu: (memberId: string) => void;
  onCloseMenu: () => void;
}

const WorkspaceMembersListItem = ({
  member,
  loggedInUserRole,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: WorkspaceMembersListItemProps) => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

  const { mutateAsync, isPending } = useRemoveWorkspaceMember();

  const name = member?.user?.name ?? "";
  const email = member?.user?.email ?? "";

  const canManageMember = canManageWorkspaceMember({
    targetWorkspaceRole: member.role,
    loggedInUserRole,
  });

  const handleCloseMenu = () => {
    onCloseMenu && onCloseMenu();
    setShowUpdateModal(false);
    setShowCancelModal(false);
  };

  const handleCancelInvitation = async () => {
    try {
      await mutateAsync(member.user?._id);
      notify.success("Member removed successfully");
      handleCloseMenu();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  return (
    <tr key={member?.user?._id} className="transition-colors hover:bg-muted/30">
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
      <td className="whitespace-nowrap px-4 py-4 text-right sm:px-6 relative">
        {member.role !== "OWNER" && (
          <button
            type="button"
            aria-label={`Manage ${name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
            onClick={() => onToggleMenu(member.user?._id)}
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        )}

        {isMenuOpen && canManageMember && (
          <div className="absolute bottom-1 right-12 z-50 w-44 rounded-xl border bg-background p-1 shadow-lg">
            <Can permission={PERMISSIONS.MANAGE_WORKSPACE_MEMBER}>
              <button
                type="button"
                onClick={() => setShowUpdateModal(true)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm"
              >
                <Edit size={16} />
                Update
              </button>
            </Can>

            <Can permission={PERMISSIONS.MANAGE_WORKSPACE_MEMBER}>
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash size={16} />
                Remove
              </button>
            </Can>
          </div>
        )}

        {/* Update Member Role Modal */}
        <WorkspaceMemberRoleUpdateModal
          open={showUpdateModal}
          member={member}
          onClose={handleCloseMenu}
        />

        {/* Remove Member Modal */}
        <ConfirmModal
          open={showCancelModal}
          title="Remove Member"
          description={`Are you sure you want to remove ${member.user?.name} ?`}
          confirmText="Remove Member"
          cancelText="Cancel"
          loading={isPending}
          onCancel={handleCloseMenu}
          onConfirm={handleCancelInvitation}
        />
      </td>
    </tr>
  );
};

export default WorkspaceMembersListItem;

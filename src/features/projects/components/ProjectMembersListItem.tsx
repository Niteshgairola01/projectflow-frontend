import { MoreHorizontal, Trash, X } from "lucide-react";
import ProjectMemberBadge from "./ProjectMemberBadge";
import type { ProjectMember } from "../types/projectMember.types";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import { useState } from "react";
import ConfirmModal from "../../../shared/components/ui/Modal/ConfirmModal";
import { useRemoveProjectMember } from "../hooks/useRemoveProjectMember";
import { notify } from "../../../shared/utils/toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { useParams } from "react-router-dom";
import type { WorkspaceMemberRole } from "../../workspace/types/workspace.types";
import { canRemoveProjectMember } from "../utils/canRemoveProjectMember";

interface ProjectMembersListItemProps {
  member: ProjectMember;
  loggedInUserRole: WorkspaceMemberRole | null;
  isMenuOpen: boolean;
  onToggleMenu: (memberId: string) => void;
  onCloseMenu: () => void;
}

const ProjectMembersListItem = ({
  member,
  isMenuOpen,
  loggedInUserRole,
  onToggleMenu,
  onCloseMenu,
}: ProjectMembersListItemProps) => {
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const { projectId } = useParams();

  const { mutateAsync, isPending } = useRemoveProjectMember();

  const name = member.user?.name ?? "";
  const email = member.user?.email ?? "";

  const canRemoveMember = canRemoveProjectMember({
    targetProjectRole: member.role,
    loggedInUserRole,
  });

  const handleCloseMenu = () => {
    onCloseMenu && onCloseMenu();
    setShowCancelModal(false);
  };

  const handleCancelInvitation = async () => {
    try {
      await mutateAsync({ projectId, memberId: member.user?._id });
      handleCloseMenu();
      notify.success("Member removed successfully");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  return (
    <tr key={member.user?._id} className="transition-colors hover:bg-muted/30">
      <td className="px-4 py-4 sm:px-6 flex items-center gap-3">
        {/* <div className=""> */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold uppercase text-primary">
          {name.slice(0, 1)}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{name}</p>

          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {email}
          </p>
        </div>
        {/* </div> */}
      </td>

      <td className="px-4 py-4 sm:px-6">
        <ProjectMemberBadge role={member.role} />
      </td>

      <td className="px-4 py-4 text-right sm:px-6 relative">
        <button
          type="button"
          aria-label={`Manage ${name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
          onClick={() => onToggleMenu(member?._id)}
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>

        {isMenuOpen && (
          <div className="absolute bottom-1 right-12 z-50 w-44 rounded-xl border bg-background p-1 shadow-lg">
            {canRemoveMember && (
              <Can permission={PERMISSIONS.REMOVE_PROJECT_MEMBER}>
                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash size={16} />
                  Remove
                </button>
              </Can>
            )}

            {/* <Can permission={PERMISSIONS.REMOVE_PROJECT_MEMBER}>
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash size={16} />
                Remove
              </button>
            </Can> */}
          </div>
        )}

        {/* Delete Task Modal */}
        <ConfirmModal
          open={showCancelModal}
          title="Remove Member"
          description={`Are you sure you want to remove ${member.user?.name} ?`}
          confirmText="Remove Member"
          cancelText="Remove"
          loading={isPending}
          onCancel={handleCloseMenu}
          onConfirm={handleCancelInvitation}
        />
      </td>
    </tr>
  );
};

export default ProjectMembersListItem;

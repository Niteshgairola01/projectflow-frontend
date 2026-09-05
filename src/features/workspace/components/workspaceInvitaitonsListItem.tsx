import { Clock3, Mail, MoreHorizontal, X } from "lucide-react";
import { formatDate } from "../../../shared/utils/formateDate";
import type { Invitation } from "../../invitation/types/invitation.types";
import { useState } from "react";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import ConfirmModal from "../../../shared/components/ui/Modal/ConfirmModal";
import { useCancelInvitation } from "../../invitation/hooks/useCancelInvitation";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";

interface WorkspaceInvitaitonsListItemProps {
  invitation: Invitation;
}

const invitationStatusStyles = {
  PENDING: {
    badge: "bg-amber-50 text-amber-700 ring-amber-600/10",
    dot: "bg-amber-500",
  },
  ACCEPTED: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    dot: "bg-emerald-500",
  },
  EXPIRED: {
    badge: "bg-slate-100 text-slate-600 ring-slate-500/10",
    dot: "bg-slate-400",
  },
  CANCELLED: {
    badge: "bg-red-50 text-red-700 ring-red-600/10",
    dot: "bg-red-500",
  },
};

const WorkspaceInvitaitonsListItem = ({
  invitation,
}: WorkspaceInvitaitonsListItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { mutateAsync, isPending } = useCancelInvitation();

  const handleCancelInvitation = async () => {
    try {
      await mutateAsync(invitation._id);
      setShowCancelModal(false);
      notify.success("Invitation cancelled successfully");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  return (
    <tr key={invitation._id} className="transition-colors hover:bg-muted/30">
      {/* Email */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">
              {invitation.email}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Waiting to join workspace
            </p>
          </div>
        </div>
      </td>

      {/* Invited By */}
      <td className="px-6 py-4">
        <p className="text-sm text-foreground">{invitation.invitedBy?.name}</p>
      </td>

      {/* Created */}
      <td className="px-6 py-4">
        <p className="text-sm text-muted-foreground">
          {formatDate(invitation.createdAt)}
        </p>
      </td>

      {/* Expiry */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4" />

          {formatDate(invitation.expiresAt)}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${invitationStatusStyles[invitation.status].badge}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${invitationStatusStyles[invitation.status].dot}`}
          />

          {invitation.status}
        </span>
      </td>
      {/* Actions */}
      <td className="px-6 py-4 text-right relative">
        <button
          type="button"
          aria-label={`Manage invitation for ${invitation.email}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>

        {isMenuOpen && (
          <div className="absolute bottom-1 right-12 z-50 w-44 rounded-xl border bg-background p-1 shadow-lg">
            {invitation.status === "PENDING" && (
              <Can permission={PERMISSIONS.INVITATION_CANCEL}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowCancelModal(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <X size={16} />
                  Cancel
                </button>
              </Can>
            )}
          </div>
        )}
      </td>

      {/* Delete Task Modal */}
      <ConfirmModal
        open={showCancelModal}
        title="Cancel Invitation"
        description={`Are you sure you want to cancel the invitation to ${invitation.email} ? This action cannot be undone.`}
        confirmText="Cancel Invitation"
        cancelText="Cancel"
        loading={isPending}
        onCancel={() => setShowCancelModal(false)}
        onConfirm={handleCancelInvitation}
      />
    </tr>
  );
};

export default WorkspaceInvitaitonsListItem;

import { Shield, User } from "lucide-react";
import { Button } from "../../../shared/components/ui/Button/Button";
import Modal from "../../../shared/components/ui/Modal/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "../../../shared/components/ui/Input/Select";
import type { WorkspaceMember } from "../types/workspace.types";
import {
  updateWorkspaceMemberRoleSchema,
  type UpdateWorkspaceMemberRolePayload,
} from "../schema/updateWorkspaceMemberRoleSchema";
import WorkspaceMemberBadge from "./WorkspaceMemberBadge";
import { workspaceMemberRoles } from "../constants/workspaceMembersOptions";
import { useUpdateWorkspaceMemberRole } from "../hooks/useUpdateWorkspaceMemberRole";
import { notify } from "../../../shared/utils/toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

interface WorkspaceMemberRoleUpdateModalProps {
  open: boolean;
  member: WorkspaceMember;
  onClose: () => void;
}

const WorkspaceMemberRoleUpdateModal = ({
  open,
  member,
  onClose,
}: WorkspaceMemberRoleUpdateModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateWorkspaceMemberRolePayload>({
    resolver: zodResolver(updateWorkspaceMemberRoleSchema),
  });

  const { mutateAsync, isPending } = useUpdateWorkspaceMemberRole();

  const name = member.user?.name;
  const email = member.user?.email;

  const handleClose = () => {
    onClose && onClose();
    reset();
  };

  const handleUpdateRole = async (data: UpdateWorkspaceMemberRolePayload) => {
    try {
      await mutateAsync({ memberId: member.user?._id, data });
      notify.success("Member role updated successfully");
      handleClose();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  return (
    <Modal onClose={handleClose} open={open} title="Update Role">
      <div className="space-y-6">
        {/* Member Details */}
        <div className="rounded-2xl border bg-muted/20 p-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold uppercase text-primary">
              {name.slice(0, 1)}
            </div>

            {/* Name / Email */}
            <div className="min-w-0 text-start">
              <p className="truncate text-sm font-semibold text-foreground">
                {name}
              </p>

              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {email}
              </p>
            </div>
          </div>
        </div>

        {/* Current Role */}
        <div className="text-start">
          <p className="mb-2 text-sm font-medium text-foreground">
            Current role
          </p>

          <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              Project role
            </div>

            <WorkspaceMemberBadge role={member.role} />
          </div>
        </div>

        {/* New Role */}
        <form onSubmit={handleSubmit(handleUpdateRole)}>
          <div className="text-start">
            <Select
              label="New Role"
              options={workspaceMemberRoles}
              {...register("role")}
              error={errors.role?.message}
              placeholder="Select a role"
            />
          </div>
          <div>
            <p className="mt-2 text-start text-xs leading-5 text-muted-foreground">
              Project Admins can manage project members and have additional
              project-level permissions.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="h-10 rounded-lg border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Cancel
            </button>

            <Button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 px-4"
              disabled={isPending}
            >
              <User className="h-4 w-4" />
              {/* Update Role */}
              {isPending ? "Updating Role..." : "Update Role"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default WorkspaceMemberRoleUpdateModal;

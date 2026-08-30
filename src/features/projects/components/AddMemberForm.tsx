import { useMemo } from "react";
import { Button } from "../../../shared/components/ui/Button/Button";
import type { WorkspaceMember } from "../../workspace/types/workspace.types";

import type { ProjectMember } from "../types/projectMember.types";

import { useAddProjectMember } from "../hooks/useAddProjectMember";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProjectMemberSchema,
  type AddProjectMemberPayload,
} from "../schema/addProjectMemberSchem";
import { Select } from "../../../shared/components/ui/Input/Select";
import { projectMemberRoles } from "../constants/projectMembersOptions";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";
import Modal from "../../../shared/components/ui/Modal/Modal";

interface AddProjectMemberFormProps {
  open: boolean;
  onClose: () => void;
  workspaceId: string;
  projectId: string;
  workspaceMembers: WorkspaceMember[];
  projectMembers: ProjectMember[];
}

const AddProjectMemberForm = ({
  open,
  onClose,
  workspaceMembers,
  projectMembers,
}: AddProjectMemberFormProps) => {
  const { mutateAsync, isPending } = useAddProjectMember();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProjectMemberPayload>({
    resolver: zodResolver(addProjectMemberSchema),
  });

  const availableMembers = useMemo(() => {
    const projectMemberIds = new Set(
      projectMembers?.map((member) => member?.user?._id),
    );

    return workspaceMembers
      .filter(
        (member) => member.user?._id && !projectMemberIds.has(member.user._id),
      )
      .map((member) => ({
        label: `${member.user?.name} - ${member.user?.email}`,
        value: member.user?._id,
      }));
  }, [workspaceMembers, projectMembers]);

  const handleSubmitForm = async (data: AddProjectMemberPayload) => {
    try {
      await mutateAsync(data);
      notify.success("Member added successfully");
      onCancel();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  const onCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal title="Add Member to Project" open={open} onClose={onCancel}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="">
          <Select
            label="Member"
            options={availableMembers}
            {...register("userId")}
            error={errors.userId?.message}
            placeholder="Select user"
          />

          <Select
            label="Role"
            options={projectMemberRoles}
            {...register("role")}
            error={errors.role?.message}
            placeholder="Select role"
          />
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Member"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProjectMemberForm;

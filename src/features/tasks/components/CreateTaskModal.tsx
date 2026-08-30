import { useParams } from "react-router-dom";
import Modal from "../../../shared/components/ui/Modal/Modal";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";
import { useWorkspace } from "../../workspace/hooks/useWorkspace";
import { useCreateTask } from "../hooks/useCreateTask";
import type { CreateTaskPayload } from "../schema/createTaskSchema";
import TaskForm from "./TaskForm";
import { useProjectMembers } from "../../projects/hooks/useProjecMembers";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateTaskModal = ({ open, onClose }: CreateTaskModalProps) => {
  const { data: members = [] } = useProjectMembers();

  const { mutateAsync, isPending } = useCreateTask();
  const workspaceMembers = members?.map((member) => ({
    label: `${member.user?.name}`,
    value: `${member.user?._id}`,
  }));

  const onSubmit = async (data: CreateTaskPayload) => {
    try {
      await mutateAsync(data);
      notify.success("Task created successfully");
      onClose();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
      console.log("err", error);
    }
  };

  return (
    <Modal title="Create Task" open={open} onClose={onClose}>
      <TaskForm
        onSubmit={onSubmit}
        onCancel={onClose}
        workspaceMembers={workspaceMembers}
        isSubmitting={isPending}
        submitLabel="Create Task"
      />
    </Modal>
  );
};

export default CreateTaskModal;

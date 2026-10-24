import Modal from "../../../shared/components/ui/Modal/Modal";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";
import { useCreateTask } from "../hooks/useCreateTask";
import type { CreateTaskPayload } from "../schema/createTaskSchema";
import TaskForm from "./TaskForm";
import type { TaskStatus } from "../types/task.types";
import { useProjectMembers } from "../../projects/hooks/useProjecMembers";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  initialStatus?: TaskStatus;
}

const CreateTaskModal = ({ open, onClose, initialStatus }: CreateTaskModalProps) => {
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
        defaultValues={{ title: "", status: initialStatus }}
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

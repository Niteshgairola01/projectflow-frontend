import { useParams } from "react-router-dom";
import Modal from "../../../shared/components/ui/Modal/Modal";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";
import { useUpdateTask } from "../hooks/useUpdateTask";
import type { CreateTaskPayload } from "../schema/createTaskSchema";
import type { Task } from "../types/task.types";
import TaskForm from "./TaskForm";
import { useWorkspace } from "../../workspace/hooks/useWorkspace";
import { useProjectMembers } from "../../projects/hooks/useProjecMembers";

interface UpdateTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task;
}

const UpdateTaskModal = ({ open, onClose, task }: UpdateTaskModalProps) => {
  const { data: members } = useProjectMembers();

  const { mutateAsync, isPending } = useUpdateTask();

  const workspaceMembers = members?.map((member) => ({
    label: `${member.user?.name}`,
    value: `${member.user?._id}`,
  }));

  const onSubmit = async (data: CreateTaskPayload) => {
    try {
      await mutateAsync({
        payload: data,
        taskId: task._id,
      });
      notify.success("Task updated successfully");
      onClose();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  return (
    <Modal title="Edit Task" open={open} onClose={onClose}>
      <TaskForm
        defaultValues={{
          title: task.title,
          description: task?.description,
          dueDate: task.dueDate,
          assignedTo: task?.assignedTo?._id,
          status: task?.status,
          priority: task?.priority,
        }}
        onSubmit={onSubmit}
        onCancel={onClose}
        workspaceMembers={workspaceMembers}
        isSubmitting={isPending}
        submitLabel="Save Changes"
      />
    </Modal>
  );
};

export default UpdateTaskModal;

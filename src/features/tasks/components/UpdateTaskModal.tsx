import Modal from "../../../shared/components/ui/Modal/Modal";
import { notify } from "../../../shared/utils/toast";
import { useUpdateTask } from "../hooks/useUpdateTask";
import type { CreateTaskPayload } from "../schema/createTaskSchema";
import type { Task } from "../types/task.types";
import TaskForm from "./TaskForm";

interface UpdateTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task;
}

const UpdateTaskModal = ({ open, onClose, task }: UpdateTaskModalProps) => {
  const { mutateAsync, isPending } = useUpdateTask();

  const onSubmit = async (data: CreateTaskPayload) => {
    try {
      await mutateAsync({
        payload: data,
        taskId: task._id,
      });
      notify.success("Task updated successfully");
      onClose();
    } catch (error) {
      notify.error(error?.message);
      console.log("err", error);
    }
  };

  return (
    <Modal title="Edit Task" open={open} onClose={onClose}>
      <TaskForm
        defaultValues={{
          title: task.title,
          description: task?.description,
          dueDate: task.dueDate,
          assignedTo: task?.assignedTo,
          status: task?.status,
          priority: task?.priority,
        }}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isPending}
        submitLabel="Save Changes"
      />
    </Modal>
  );
};

export default UpdateTaskModal;

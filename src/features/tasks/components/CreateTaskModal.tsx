import Modal from "../../../shared/components/ui/Modal/Modal";
import { notify } from "../../../shared/utils/toast";
import { useCreateTask } from "../hooks/useCreateTask";
import type { CreateTaskPayload } from "../schema/createTaskSchema";
import TaskForm from "./TaskForm";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateTaskModal = ({ open, onClose }: CreateTaskModalProps) => {
  const { mutateAsync, isPending } = useCreateTask();

  const onSubmit = async (data: CreateTaskPayload) => {
    try {
      await mutateAsync(data);
      notify.success("Task created successfully");
      onClose();
    } catch (error) {
      notify.error(error?.message);
      console.log("err", error);
    }
  };

  return (
    <Modal title="Create Task" open={open} onClose={onClose}>
      <TaskForm
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isPending}
        submitLabel="Create Task"
      />
    </Modal>
  );
};

export default CreateTaskModal;

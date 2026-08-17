import Modal from "../../../shared/components/ui/Modal/Modal";
import { type CreateProjectPayload } from "../schema/createProjectSchema";
import { useCreateProject } from "../hooks/useCreateProject";
import ProjectForm from "./ProjectForm";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({ open, onClose }: CreateProjectModalProps) => {
  const { mutateAsync, isPending } = useCreateProject();

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data: CreateProjectPayload) => {
    try {
      await mutateAsync(data);
      onClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal
      title="Create Project"
      description="Organize your projects and team members"
      open={open}
      onClose={handleClose}
    >
      <ProjectForm
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isPending}
        submitLabel="Create Project"
      />
    </Modal>
  );
};

export default CreateProjectModal;

import Modal from "../../../shared/components/ui/Modal/Modal";
import { useUpdateProject } from "../hooks/useUpdateProject";
import type { UpdateProjectPayload } from "../schema/createProjectSchema";
import type { Project } from "../types/project.types";
import ProjectForm from "./ProjectForm";

interface UpdateProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: Project;
}

const UpdateProjectModal = ({
  open,
  onClose,
  project,
}: UpdateProjectModalProps) => {
  const { mutateAsync, isPending } = useUpdateProject();

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data: UpdateProjectPayload) => {
    try {
      await mutateAsync({
        projectId: project?._id,
        data,
      });

      onClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal
      title="Update Project"
      description="Organize your projects and team members"
      open={open}
      onClose={handleClose}
    >
      <ProjectForm
        defaultValues={{
          name: project.name,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          color: project.color,
        }}
        onSubmit={onSubmit}
        onCancel={handleClose}
        isSubmitting={isPending}
        submitLabel="Save Changes"
      />
    </Modal>
  );
};

export default UpdateProjectModal;

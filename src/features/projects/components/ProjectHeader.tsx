import { ArrowLeft, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../../../shared/utils/formateDate";
import type { Project } from "../types/project.types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UpdateProjectModal from "./UpdateProjectModal";
import ConfirmModal from "../../../shared/components/ui/Modal/ConfirmModal";
import { useDeleteProject } from "../hooks/useDeleteProject";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useDeleteProject();

  const handleDelete = async () => {
    await mutateAsync({
      projectId: project._id,
    });
  };

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Project Icon */}
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-semibold text-white shadow-sm"
            style={{
              backgroundColor: project.color || "#6C63FF",
            }}
          >
            {project.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {project.name}
              </h1>

              <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {project.status}
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {project.description || "No description available"}
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              Started {formatDate(project.startDate)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-xl border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Project actions"
          >
            <MoreVertical size={20} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-12 z-50 w-44 rounded-xl border bg-background p-1 shadow-lg">
              <Can permission={PERMISSIONS.PROJECT_UPDATE}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsUpdateOpen(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                >
                  <Pencil size={16} />
                  Edit Project
                </button>
              </Can>

              <Can permission={PERMISSIONS.PROJECT_DELETE}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowDeleteModal(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </Can>
            </div>
          )}

          {/* Update Project Modal */}
          <UpdateProjectModal
            open={isUpdateOpen}
            onClose={() => setIsUpdateOpen(false)}
            project={project}
          />

          {/* Delete Project Modal */}
          <ConfirmModal
            open={showDeleteModal}
            title="Delete Project"
            description={`Are you sure you want to delete "${project.name}"? This action cannot be undone.`}
            confirmText="Delete Project"
            cancelText="Cancel"
            loading={isPending}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;

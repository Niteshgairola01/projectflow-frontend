import { ArrowLeft, MoreVertical } from "lucide-react";
import { formatDate } from "../../../shared/utils/formateDate";
import type { Project } from "../types/project.types";
import { useNavigate } from "react-router-dom";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-muted-foreground
          transition
          hover:text-foreground
        "
      >
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Project Icon */}
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              text-xl
              font-semibold
              text-white
              shadow-sm
            "
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
        <button
          type="button"
          className="
            rounded-xl
            border
            p-2
            text-muted-foreground
            transition
            hover:bg-muted
            hover:text-foreground
          "
        >
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;

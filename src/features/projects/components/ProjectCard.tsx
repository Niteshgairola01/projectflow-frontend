import { MoreVertical } from "lucide-react";
import type { Project } from "../types/project.types";
import { formatDate } from "../../../shared/utils/formateDate";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        rounded-2xl
        border
        bg-card
        p-5
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
          style={{
            backgroundColor: project.color || "#6C63FF",
          }}
        >
          {project.name.charAt(0).toUpperCase()}
        </div>

        <button
          type="button"
          onClick={(event) => event.stopPropagation()}
          className="rounded-lg p-1 hover:bg-muted"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold">{project.name}</h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.description || "No description"}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          {project.status}
        </span>

        <span className="text-xs text-muted-foreground">
          {formatDate(project.startDate)}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;

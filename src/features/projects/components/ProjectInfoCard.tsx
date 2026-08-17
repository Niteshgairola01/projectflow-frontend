import { CalendarDays, Clock3, User } from "lucide-react";
import { formatDate } from "../../../shared/utils/formateDate";
import type { Project } from "../types/project.types";
import { useGetUserById } from "../../auth/hooks/useGetUserById";

interface ProjectInfoCardProps {
  project: Project;
}

const ProjectInfoCard = ({ project }: ProjectInfoCardProps) => {
  const { data: user } = useGetUserById(project?.createdBy);

  return (
    <div className="rounded-2xl border bg-card p-6 lg:col-span-2">
      <h2 className="mb-6 text-lg font-semibold text-primary">
        Project Information
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Start Date */}
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-muted p-2">
            <CalendarDays size={18} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>

            <p className="mt-1 font-medium">{formatDate(project.startDate)}</p>
          </div>
        </div>

        {/* End Date */}
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-muted p-2">
            <CalendarDays size={18} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">End Date</p>

            <p className="mt-1 font-medium">
              {project.endDate ? formatDate(project.endDate) : "No deadline"}
            </p>
          </div>
        </div>

        {/* Created By */}
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-muted p-2">
            <User size={18} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Created By</p>

            <p className="mt-1 font-medium">{user?.name || ""}</p>
          </div>
        </div>

        {/* Created At */}
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-muted p-2">
            <Clock3 size={18} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Created At</p>

            <p className="mt-1 font-medium">{formatDate(project.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoCard;

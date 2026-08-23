import { CalendarDays, Clock3, User, CalendarCheck2 } from "lucide-react";
import { formatDate } from "../../../shared/utils/formateDate";
import type { Project } from "../types/project.types";
import { useGetUserById } from "../../auth/hooks/useGetUserById";

interface ProjectInfoCardProps {
  project: Project;
}

const ProjectInfoCard = ({ project }: ProjectInfoCardProps) => {
  const { data: user, isLoading: isUserLoading } = useGetUserById(
    project.createdBy,
  );

  const projectInfo = [
    {
      label: "Start Date",
      value: project.startDate ? formatDate(project.startDate) : "Not set",
      icon: CalendarDays,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      label: "End Date",
      value: project.endDate ? formatDate(project.endDate) : "No deadline",
      icon: CalendarCheck2,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      label: "Created By",
      value: isUserLoading ? "Loading..." : user?.name || "Unknown user",
      icon: User,
      iconClass: "bg-violet-100 text-violet-600",
    },
    {
      label: "Created At",
      value: project.createdAt ? formatDate(project.createdAt) : "Unknown",
      icon: Clock3,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="rounded-2xl border bg-card p-6 lg:col-span-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary">
            Project Information
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Key details about this project
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarDays size={18} />
        </div>
      </div>

      {/* Information */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projectInfo.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-xl border bg-muted/20 p-4 transition-colors hover:bg-muted/40"
            >
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconClass}`}
              >
                <Icon size={18} />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </p>

                <p className="mt-1 truncate text-sm font-semibold">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectInfoCard;

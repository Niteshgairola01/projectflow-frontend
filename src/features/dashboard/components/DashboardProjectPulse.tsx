import { panel, focus } from "../constants/dashboardStyles";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { dateLabel, projectPath, type ProjectSummary } from "../utils/dashboardUtils";

interface Props {
  workspaceId: string;
  projectSummaries: ProjectSummary[];
}

const DashboardProjectPulse = (props: Props) => {
  const { workspaceId, projectSummaries } = props;
  return (
    <section className={panel}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Project pulse</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Your most recently updated projects
          </p>
        </div>
        <Link
          to={`/workspaces/${workspaceId}/projects`}
          className={`inline-flex items-center gap-1 text-xs font-semibold text-primary ${focus}`}
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projectSummaries.map(({ project, totalTasks, done, percent }) => {
            return (
              <Link
                key={project._id}
                to={projectPath(workspaceId, project._id)}
                className={`rounded-xl border border-border p-4 transition-colors hover:border-primary/50 hover:bg-muted/30 ${focus}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ background: project.color || "#6c63ff" }}
                  >
                    {project.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {project.status === "ACTIVE"
                        ? "Active project"
                        : "Archived project"}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground"
                  />
                </div>
                <div className="mb-2 mt-5 flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {done} / {totalTasks} tasks complete
                  </span>
                  <span className="font-semibold">{percent}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-label={`${project.name} completion`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percent}
                  className="h-1.5 overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                {project.endDate && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Due {dateLabel(project.endDate)}
                  </p>
                )}
              </Link>
            );
          })}
      </div>
      {projectSummaries.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No projects yet. Open Explore projects to create your first one.
        </p>
      )}
    </section>
  );
};

export default DashboardProjectPulse;

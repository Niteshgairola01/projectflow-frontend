import {
  CheckCircle2,
  Clock3,
  ListTodo,
  CircleDashed,
  TrendingUp,
} from "lucide-react";

import { useProjectTasks } from "../../tasks/hooks/useProjectTasks";

const ProjectStatsCard = () => {
  const { data: tasks = [], isLoading, isError } = useProjectTasks();

  const total = tasks.length;

  const todo = tasks.filter((task) => task.status === "TODO").length;

  const inProgress = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  const inReview = tasks.filter((task) => task.status === "IN_REVIEW").length;

  const completed = tasks.filter((task) => task.status === "DONE").length;

  const completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: "To Do",
      value: todo,
      icon: CircleDashed,
      iconClass: "bg-slate-100 text-slate-600",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock3,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      label: "In Review",
      value: inReview,
      icon: TrendingUp,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="rounded-2xl border bg-card p-6">
        <div className="mb-6 h-6 w-28 animate-pulse rounded bg-muted" />

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border bg-card p-6">
        <h2 className="text-lg font-semibold text-primary">Quick Stats</h2>

        <div className="mt-6 rounded-xl border border-dashed p-6 text-center">
          <p className="text-sm font-medium">Unable to load task statistics</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary">Quick Stats</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Current project progress
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ListTodo size={18} />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-muted/20 p-4 transition hover:bg-muted/40"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.iconClass}`}
                >
                  <Icon size={17} />
                </div>

                <span className="text-xl font-bold">{stat.value}</span>
              </div>

              <p className="mt-3 text-xs font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Completion */}
      <div className="mt-6 border-t pt-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-600" />

            <span className="text-sm font-medium">Completion</span>
          </div>

          <span className="text-sm font-semibold">{completionPercentage}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          {completed} of {total} tasks completed
        </p>
      </div>
    </div>
  );
};

export default ProjectStatsCard;

import { panel, focus } from "../constants/dashboardStyles";
import { Link } from "react-router-dom";
import type { Project } from "../../projects/types/project.types";
import type { Task } from "../../tasks/types/task.types";
import { useState } from "react";
import { CalendarDays, CheckCheck, CircleCheck } from "lucide-react";
import { dateLabel, isTaskOverdue, getVisibleTasks, projectPath } from "../utils/dashboardUtils";

interface Props {
  tasks: Task[];
  projects: Project[];
  workspaceId: string;
  userId?: string;
}

const DashboardTaskAgenda = (props: Props) => {
  const { tasks, projects, workspaceId, userId } = props;
  const [taskView, setTaskView] = useState<"all" | "mine">("mine");
  const visibleTasks = getVisibleTasks(tasks, taskView, userId);
  return (
    <section className={`${panel} xl:col-span-2`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Up next</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Open tasks, ordered by due date
          </p>
        </div>
        <div className="flex rounded-lg bg-muted p-1">
          {(["mine", "all"] as const).map((view) => (
            <button
              type="button"
              key={view}
              aria-pressed={taskView === view}
              onClick={() => setTaskView(view)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${focus} ${taskView === view ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              {view === "mine" ? "Assigned to me" : "All tasks"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 divide-y divide-border">
        {visibleTasks.slice(0, 6).map((task) => (
          <Link
            key={task._id}
            to={`${projectPath(workspaceId, task.project)}/tasks/${task._id}`}
            className={`group flex items-center gap-3 rounded-lg py-4 transition-colors hover:bg-muted/50 ${focus}`}
          >
            <span
              className={`shrink-0 rounded-lg p-2 ${isTaskOverdue(task) ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"}`}
            >
              <CheckCheck size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium group-hover:text-primary">
                {task.title}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {projects.find(
                  (project) => project._id === task.project,
                )?.name ?? "Project"}{" "}
                · {task.assignedTo?.name ?? "Unassigned"}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p
                className={`text-[11px] font-semibold ${task.priority === "HIGH" ? "text-rose-500" : "text-muted-foreground"}`}
              >
                {task.priority.charAt(0) +
                  task.priority.slice(1).toLowerCase()}{" "}
                priority
              </p>
              <p
                className={`mt-1 flex items-center justify-end gap-1 text-xs ${isTaskOverdue(task) ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}
              >
                <CalendarDays size={12} />
                {task.dueDate
                  ? `${isTaskOverdue(task) ? "Overdue · " : ""}${dateLabel(task.dueDate)}`
                  : "No due date"}
              </p>
            </div>
          </Link>
        ))}
        {visibleTasks.length === 0 && (
          <div className="py-12 text-center">
            <CircleCheck
              size={32}
              className="mx-auto mb-3 text-emerald-500"
            />
            <p className="text-sm font-medium">
              {taskView === "mine"
                ? "No open tasks assigned to you"
                : "No open tasks"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {taskView === "mine"
                ? "Switch to All tasks to see your team's work."
                : "Tasks will appear here when added to a project."}
            </p>
          </div>
        )}
      </div>
      {visibleTasks.length > 6 && (
        <p className="mt-3 text-xs text-muted-foreground">
          Showing the next 6 of {visibleTasks.length} open tasks. Open a
          project to see its full task board.
        </p>
      )}
    </section>
  );
};

export default DashboardTaskAgenda;

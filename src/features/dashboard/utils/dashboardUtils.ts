import type { Project } from "../../projects/types/project.types";
import type { Task } from "../../tasks/types/task.types";
import { taskStatusOptions } from "../../tasks/constants/taskOptions";

const statusColors = { TODO: "#94a3b8", IN_PROGRESS: "#818cf8", IN_REVIEW: "#f59e0b", DONE: "#10b981" };

export const dateLabel = (value: string) => new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });

export const projectPath = (workspaceId: string, projectId: string) => `/workspaces/${workspaceId}/projects/${projectId}`;

export const isTaskOverdue = (task: Task, now = new Date()) => {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return !!task.dueDate && task.status !== "DONE" && new Date(task.dueDate).getTime() < today.getTime();
};

export const getVisibleTasks = (tasks: Task[], view: "all" | "mine", userId?: string) => tasks
  .filter((task) => task.status !== "DONE" && (view === "all" || task.assignedTo?._id === userId))
  .sort((a, b) => (a.dueDate ? new Date(a.dueDate).getTime() : Infinity) - (b.dueDate ? new Date(b.dueDate).getTime() : Infinity));

export const getDashboardSummary = (projects: Project[], tasks: Task[], userId?: string) => {
  const openTasks = tasks.filter((task) => task.status !== "DONE");
  const completed = tasks.length - openTasks.length;
  const tasksByProject = new Map<string, { totalTasks: number; done: number }>();
  tasks.forEach((task) => {
    const counts = tasksByProject.get(task.project) ?? { totalTasks: 0, done: 0 };
    counts.totalTasks++;
    if (task.status === "DONE") counts.done++;
    tasksByProject.set(task.project, counts);
  });
  return {
    projectCount: projects.length,
    activeProjectCount: projects.filter((project) => project.status === "ACTIVE").length,
    totalTasks: tasks.length,
    openTaskCount: openTasks.length,
    assignedTaskCount: openTasks.filter((task) => task.assignedTo?._id === userId).length,
    completed,
    completion: tasks.length ? Math.round(completed / tasks.length * 100) : 0,
    overdueCount: openTasks.filter((task) => isTaskOverdue(task)).length,
    statusCounts: taskStatusOptions.map((status) => ({ ...status, color: statusColors[status.value], count: tasks.filter((task) => task.status === status.value).length })),
    projectSummaries: [...projects]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 6)
      .map((project) => {
        const { totalTasks, done } = tasksByProject.get(project._id) ?? { totalTasks: 0, done: 0 };
        return { project, totalTasks, done, percent: totalTasks ? Math.round(done / totalTasks * 100) : 0 };
      }),
  };
};

export type DashboardSummary = ReturnType<typeof getDashboardSummary>;
export type ProjectSummary = DashboardSummary["projectSummaries"][number];

export const getStatusGradient = (statuses: DashboardSummary["statusCounts"], totalTasks: number) => {
  let angle = 0;
  return statuses.map((status) => {
    const start = angle;
    angle += totalTasks ? status.count / totalTasks * 360 : 0;
    return `${status.color} ${start}deg ${angle}deg`;
  }).join(", ");
};

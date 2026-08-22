import { CalendarDays, User } from "lucide-react";
import type { Task } from "../types/task.types";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = ({ task }: TaskListItemProps) => {
  const getStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "TODO":
        return "To Do";

      case "IN_PROGRESS":
        return "In Progress";

      case "IN_REVIEW":
        return "In Review";

      case "DONE":
        return "Done";

      default:
        return status;
    }
  };

  const getPriorityLabel = (priority: Task["priority"]) => {
    return priority.charAt(0) + priority.slice(1).toLowerCase();
  };

  const getStatusStyles = (status: Task["status"]) => {
    switch (status) {
      case "TODO":
        return "bg-muted text-muted-foreground";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "IN_REVIEW":
        return "bg-purple-100 text-purple-700";

      case "DONE":
        return "bg-green-100 text-green-700";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityStyles = (priority: Task["priority"]) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";

      case "LOW":
        return "bg-green-100 text-green-700";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (date?: string) => {
    if (!date) {
      return "—";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div
      className="grid min-w-200 grid-cols-[minmax(280px,1fr)_150px_120px_160px_120px] items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30
      "
    >
      {/* Task */}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{task.title}</p>

        {task.description && (
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {task.description}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyles(
            task.status
          )}`}
        >
          {getStatusLabel(task.status)}
        </span>
      </div>

      {/* Priority */}
      <div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityStyles(
            task.priority
          )}`}
        >
          {getPriorityLabel(task.priority)}
        </span>
      </div>

      {/* Assignee */}
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User size={14} />
        </div>

        <span className="truncate text-sm text-muted-foreground">
          {task.assignedTo ?? "Unassigned"}
        </span>
      </div>

      {/* Due date */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays size={15} />

        <span>{formatDate(task.dueDate)}</span>
      </div>
    </div>
  );
};

export default TaskListItem;

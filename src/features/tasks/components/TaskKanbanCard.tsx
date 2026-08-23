import { CalendarDays, MoreHorizontal, User } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import type { Task } from "../types/task.types";

interface TaskKanbanCardProps {
  task: Task;
  onClick: () => void;
}

const TaskKanbanCard = ({ task, onClick }: TaskKanbanCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: {
      status: task.status,
    },
  });

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

  const getPriorityLabel = (priority: Task["priority"]) => {
    return priority.charAt(0) + priority.slice(1).toLowerCase();
  };

  const formatDate = (date?: string) => {
    if (!date) {
      return null;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div
      className="group cursor-pointer rounded-xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      onClick={onClick}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex rounded-md px-2 py-1 text-[11px] font-medium ${getPriorityStyles(
            task.priority,
          )}`}
        >
          {getPriorityLabel(task.priority)}
        </span>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="rounded-md p-1 text-muted-foreground opacity-0 transition hover:bg-muted hover:text-foreground group-hover:opacity-100"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Title */}
      <h4 className="mt-3 text-sm font-semibold leading-5">{task.title}</h4>

      {/* Description */}
      {task.description && (
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
          {task.description}
        </p>
      )}

      {/* Bottom metadata */}
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        {/* Assignee */}
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User size={13} />
          </div>

          <span className="max-w-25 truncate text-xs text-muted-foreground">
            {task.assignedTo ?? "Unassigned"}
          </span>
        </div>

        {/* Due date */}
        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays size={13} />

            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskKanbanCard;

import { CalendarDays, MoreVertical, Pencil, Trash2, User } from "lucide-react";
import type { Task } from "../types/task.types";
import { useState } from "react";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import UpdateTaskModal from "./UpdateTaskModal";
import ConfirmModal from "../../../shared/components/ui/Modal/ConfirmModal";
import { useDeleteTask } from "../hooks/useDeleteTasks";
import { notify } from "../../../shared/utils/toast";
import { NavLink } from "react-router-dom";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = ({ task }: TaskListItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutateAsync, isPending } = useDeleteTask();

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

  // Delete task
  const handleDelete = async () => {
    try {
      mutateAsync({ taskId: task._id });
      setShowDeleteModal(false);
    } catch (error) {
      notify.error(error?.message || "Failed to delete task");
      console.log("error", error);
    }
  };

  return (
    <div
      className="grid min-w-200 grid-cols-[minmax(280px,1fr)_120px_120px_160px_120px_120px] items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30
      "
    >
      {/* Task */}
      <NavLink className="min-w-0" to={`${task._id}`}>
        <p className="truncate text-sm font-medium">{task.title}</p>

        {task.description && (
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {task.description}
          </p>
        )}
      </NavLink>

      {/* Status */}
      <div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyles(
            task.status,
          )}`}
        >
          {getStatusLabel(task.status)}
        </span>
      </div>

      {/* Priority */}
      <div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityStyles(
            task.priority,
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

      {/* Action */}
      <div className="flex justify-end relative">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-xl border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Project actions"
        >
          <MoreVertical size={20} />
        </button>

        {isMenuOpen && (
          <div className="absolute  bottom-1 right-12 z-50 w-44 rounded-xl border bg-background p-1 shadow-lg">
            <Can permission={PERMISSIONS.TASK_UPDATE}>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsUpdateOpen(true);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
              >
                <Pencil size={16} />
                Edit Task
              </button>
            </Can>

            <Can permission={PERMISSIONS.TASK_DELETE}>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowDeleteModal(true);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </Can>
          </div>
        )}
      </div>

      {/* Update Modal */}
      <UpdateTaskModal
        task={task}
        open={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
      />

      {/* Delete Task Modal */}
      <ConfirmModal
        open={showDeleteModal}
        title="Delete Task"
        description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete Task"
        cancelText="Cancel"
        loading={isPending}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TaskListItem;

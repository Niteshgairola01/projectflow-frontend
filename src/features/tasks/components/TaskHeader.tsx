import {
  ArrowLeft,
  CalendarDays,
  MoreHorizontal,
  Pencil,
  Trash2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteTask } from "../hooks/useDeleteTasks";
import { useState } from "react";
import { notify } from "../../../shared/utils/toast";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import UpdateTaskModal from "./UpdateTaskModal";
import ConfirmModal from "../../../shared/components/ui/Modal/ConfirmModal";
import type { Task } from "../types/task.types";
import { formatDate } from "../../../shared/utils/formateDate";

interface TaskHeaderProps {
  task: Task;
}

const TaskHeader = ({ task }: TaskHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutateAsync, isPending } = useDeleteTask();

  const navigate = useNavigate();

  const statusConfig: Record<
    string,
    {
      label: string;
      className: string;
    }
  > = {
    TODO: {
      label: "Todo",
      className: "bg-slate-100 text-slate-700",
    },

    IN_PROGRESS: {
      label: "In Progress",
      className: "bg-blue-100 text-blue-700",
    },

    IN_REVIEW: {
      label: "In Review",
      className: "bg-purple-100 text-purple-700",
    },

    DONE: {
      label: "Done",
      className: "bg-green-100 text-green-700",
    },
  };

  const priorityConfig: Record<
    string,
    {
      label: string;
      className: string;
    }
  > = {
    HIGH: {
      label: "High",
      className: "bg-red-100 text-red-700",
    },

    MEDIUM: {
      label: "Medium",
      className: "bg-amber-100 text-amber-700",
    },

    LOW: {
      label: "Low",
      className: "bg-green-100 text-green-700",
    },
  };

  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];

  // Delete task
  const handleDelete = async () => {
    try {
      mutateAsync({ taskId: task._id });
      setShowDeleteModal(false);
      navigate(-1);
    } catch (error) {
      notify.error(error?.message || "Failed to delete task");
      console.log("error", error);
    }
  };

  return (
    <div className="border-b px-6 py-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-5  px-3 py-1 rounded-2xl inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors bg-primary/10 hover:text-white hover:bg-primary"
      >
        <ArrowLeft size={16} />
        Back to Tasks
      </button>

      {/* Top section */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{task.title}</h1>

          {task.description && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {task.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 relative">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Task actions"
          >
            <MoreHorizontal size={18} />
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
      </div>

      {/* Task information */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {/* Status */}
        {status && (
          <span
            className={` inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
          >
            {status.label}
          </span>
        )}

        {/* Priority */}
        {priority && (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${priority.className}`}
          >
            {priority.label} Priority
          </span>
        )}

        {/* Divider */}
        <span className="hidden h-5 w-px bg-border sm:block" />

        {/* Assignee */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User size={14} />
          </div>

          <span>{task.assignedTo || "Unassigned"}</span>
        </div>

        {/* Due date */}
        {task.dueDate && (
          <>
            <span className="hidden h-5 w-px bg-border sm:block" />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays size={15} />

              <span>Due {formatDate(task.dueDate)}</span>
            </div>
          </>
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

export default TaskHeader;

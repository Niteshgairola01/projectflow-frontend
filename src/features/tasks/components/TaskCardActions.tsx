import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import ConfirmModal from "../../../shared/components/ui/Modal/ConfirmModal";
import { useDeleteTask } from "../hooks/useDeleteTasks";
import type { Task } from "../types/task.types";
import UpdateTaskModal from "./UpdateTaskModal";

const TaskCardActions = ({ task }: { task: Task }) => {
  const { can, isLoading } = usePermissions();
  const canUpdate = !isLoading && can(PERMISSIONS.TASK_UPDATE);
  const canDelete = !isLoading && can(PERMISSIONS.TASK_DELETE);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { mutateAsync, isPending } = useDeleteTask();

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [menuOpen]);

  if (!canUpdate && !canDelete) return null;

  return (
    <div
      ref={containerRef}
      className="relative"
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === "Escape") setMenuOpen(false);
      }}
    >
      <button
        type="button"
        aria-label={`Actions for ${task.title}`}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        <MoreHorizontal size={16} />
      </button>
      {menuOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border bg-background p-1 shadow-lg">
          {canUpdate && (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setEditOpen(true);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
            >
              <Pencil size={16} /> Edit Task
            </button>
          )}
          {canDelete && (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setDeleteOpen(true);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={15} /> Delete
            </button>
          )}
        </div>
      )}
      {canUpdate &&
        editOpen &&
        createPortal(
          <UpdateTaskModal
            task={task}
            open
            onClose={() => setEditOpen(false)}
          />,
          document.body,
        )}
      {canDelete &&
        deleteOpen &&
        createPortal(
          <ConfirmModal
            open
            title="Delete Task"
            description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
            confirmText="Delete Task"
            loading={isPending}
            onCancel={() => {
              if (!isPending) setDeleteOpen(false);
            }}
            onConfirm={async () => {
              try {
                await mutateAsync({ taskId: task._id });
                setDeleteOpen(false);
              } catch {
                // The mutation displays the error; keep the dialog open for retry.
              }
            }}
          />,
          document.body,
        )}
    </div>
  );
};

export default TaskCardActions;

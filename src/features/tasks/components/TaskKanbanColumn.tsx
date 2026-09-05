import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import type { Task, TaskStatus } from "../types/task.types";

import TaskKanbanCard from "./TaskKanbanCard";
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import { useNavigate } from "react-router-dom";

interface TaskKanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  activeTaskId?: string;
  canCreate: boolean;
  canDrag: boolean;
}

const TaskKanbanColumn = ({
  title,
  status,
  tasks,
  activeTaskId,
  canCreate,
  canDrag,
}: TaskKanbanColumnProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const getStatusDot = (status: TaskStatus) => {
    switch (status) {
      case "TODO":
        return "bg-gray-400";

      case "IN_PROGRESS":
        return "bg-blue-500";

      case "IN_REVIEW":
        return "bg-purple-500";

      case "DONE":
        return "bg-green-500";

      default:
        return "bg-gray-400";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={
        `flex min-h-125 min-w-0 flex-col rounded-xl border p-3 ${
          isOver ? 'border-muted bg-muted/60' : 'border-muted/10'
        }`
      }
    >
      {/* Column header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${getStatusDot(status)}`}
          />

          <h3 className="text-sm font-semibold">{title}</h3>

          <span className="rounded-md bg-background px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>

        {canCreate && (
          <button
            type="button"
            className="rounded-md p-1 text-muted-foreground transition hover:bg-background hover:text-foreground"
            title="Add task"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      {/* Tasks */}
      <div className="flex flex-1 flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskKanbanCard
              key={task._id}
              task={task}
              onClick={() => navigate(`${task._id}`)}
              isPlaceholder={task._id === activeTaskId}
              canDrag={canDrag}
            />
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/70 p-6 text-center">
            <p className="text-xs text-muted-foreground">No tasks</p>
          </div>
        )}
      </div>

      {isCreateOpen && (
        <CreateTaskModal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskKanbanColumn;

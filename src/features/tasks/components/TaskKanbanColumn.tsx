import { Plus } from "lucide-react";

import type { Task, TaskStatus } from "../types/task.types";

import TaskKanbanCard from "./TaskKanbanCard";

interface TaskKanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

const TaskKanbanColumn = ({ title, status, tasks }: TaskKanbanColumnProps) => {
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
    <div className="flex min-h-125 min-w-0 flex-col rounded-xl bg-muted/40 p-3">
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

        <button
          type="button"
          className="rounded-md p-1 text-muted-foreground transition hover:bg-background hover:text-foreground"
          title="Add task"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Tasks */}
      <div className="flex flex-1 flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskKanbanCard key={task._id} task={task} />)
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/70 p-6 text-center">
            <p className="text-xs text-muted-foreground">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskKanbanColumn;

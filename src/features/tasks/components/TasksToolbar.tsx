import { CheckCircle2, LayoutGrid, List, Search, X } from "lucide-react";
import { Input } from "../../../shared/components/ui/Input/Input";
import { Select } from "../../../shared/components/ui/Input/Select";
import {
  taskAssigStatusOptions,
  taskPriorityOptions,
  taskStatusOptions,
} from "../constants/taskOptions";
import type {
  TaskFilters,
  TaskPriority,
  TaskStatus,
} from "../types/task.types";

type TaskView = "list" | "kanban";

interface TasksToolbarProps {
  filters: TaskFilters;
  view: string;
  onViewChange: (view: TaskView) => void;
  updateFilter: <K extends keyof TaskFilters>(
    key: K,
    value: TaskFilters[K]
  ) => void;
  clearFilters: () => void;
}

const TasksToolbar = ({
  filters,
  view,
  onViewChange,
  updateFilter,
  clearFilters,
}: TasksToolbarProps) => {
  const hasFilters =
    filters.search || filters.status || filters.priority || filters.assignee;

  return (
    <div className="flex flex-col gap-4 border-b px-6 pb-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left - Filters */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative min-w-55 flex-1 lg:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search tasks..."
            className="pl-9 pr-3"
          />
        </div>

        {/* Status */}
        <div className="relative">
          <CheckCircle2
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Select
            value={filters.status}
            onChange={(e) =>
              updateFilter("status", e.target.value as TaskStatus | "")
            }
            placeholder="All Status"
            icon={<CheckCircle2 size={14} />}
            options={taskStatusOptions}
            className="h-9 w-auto min-w-32.5"
          />{" "}
        </div>

        {/* Priority */}
        <Select
          value={filters.priority}
          onChange={(e) =>
            updateFilter("priority", e.target.value as TaskPriority | "")
          }
          placeholder="All Priority"
          options={taskPriorityOptions}
          className="h-9 w-auto min-w-32.5"
        />
        {/* Assignee */}
        <Select
          value={filters.assignee}
          onChange={(e) => updateFilter("assignee", e.target.value)}
          placeholder="All Assignees"
          options={taskAssigStatusOptions}
          className="h-9 w-auto min-w-35"
        />

        {/* Filter indicator */}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Right - View switcher */}
      <div className="flex shrink-0 items-center rounded-lg border bg-muted/40 p-1">
        <button
          type="button"
          onClick={() => onViewChange("list")}
          className={`inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition
            ${
              view === "list"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
        >
          <List size={16} />
          <span className="hidden sm:inline">List</span>
        </button>

        <button
          type="button"
          onClick={() => onViewChange("kanban")}
          className={`inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition
            ${
              view === "kanban"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
        >
          <LayoutGrid size={16} />
          <span className="hidden sm:inline">Board</span>
        </button>
      </div>
    </div>
  );
};

export default TasksToolbar;

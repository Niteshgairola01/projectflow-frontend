import { ClipboardList } from "lucide-react";
import TaskListItem from "./TaskListItem";
import type { Task } from "../types/task.types";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
}

const TaskList = ({ tasks, isLoading, isError }: TaskListProps) => {
  if (isLoading) {
    return (
      <div className="divide-y">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center gap-4 px-6 py-4">
            <div className="h-4 w-4 animate-pulse rounded bg-muted" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
            </div>

            <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="font-medium">Failed to load tasks</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while loading the tasks.
        </p>
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="rounded-2xl bg-muted p-4">
          <ClipboardList size={28} className="text-muted-foreground" />
        </div>

        <h3 className="mt-4 font-semibold">No tasks yet</h3>

        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Create your first task to start organizing this project.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Header */}
      <div className="grid min-w-200 grid-cols-[minmax(280px,1fr)_150px_120px_160px_120px] items-center gap-4 border-b bg-muted/30 px-6 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Task</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Assignee</span>
        <span>Due Date</span>
      </div>

      {/* Tasks */}
      <div className="divide-y">
        {tasks.map((task) => (
          <TaskListItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

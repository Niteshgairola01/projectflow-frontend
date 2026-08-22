import { Plus } from "lucide-react";

import { Button } from "../../../shared/components/ui/Button/Button";
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";

interface TasksHeaderProps {
  taskCount?: number;
}

const TasksHeader = ({ taskCount = 0 }: TasksHeaderProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex items-center justify-between border-b px-6 py-5">
      {/* Left */}
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Tasks</h1>

          <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            {taskCount}
          </span>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage tasks belonging to this project
        </p>
      </div>

      {/* Right */}
      <Button
        className="inline-flex items-center gap-2 text-sm"
        onClick={() => setIsCreateOpen(true)}
      >
        <Plus size={16} />
        Add Task
      </Button>

      {isCreateOpen && (
        <CreateTaskModal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      )}
    </div>
  );
};

export default TasksHeader;

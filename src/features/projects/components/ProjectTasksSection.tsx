import { ListTodo, Plus } from "lucide-react";

const ProjectTasksSection = () => {
  return (
    <div className="rounded-2xl border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div>
          <h2 className="font-semibold">Tasks</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage tasks belonging to this project
          </p>
        </div>

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="rounded-2xl bg-muted p-4">
          <ListTodo size={28} className="text-muted-foreground" />
        </div>

        <h3 className="mt-4 font-semibold">No tasks yet</h3>

        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Start organizing your project by creating your first task.
        </p>
      </div>
    </div>
  );
};

export default ProjectTasksSection;

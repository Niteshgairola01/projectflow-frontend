import { ListTodo } from "lucide-react";

const EmptyTasksState = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="rounded-2xl bg-muted p-4">
        <ListTodo size={28} className="text-muted-foreground" />
      </div>

      <h3 className="mt-4 font-semibold">No tasks yet</h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Start organizing your project by creating your first task.
      </p>
    </div>
  );
};

export default EmptyTasksState;

import TaskHeader from "../components/TaskHeader";
import { useTask } from "../hooks/useTask";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import { formatDate } from "../../../shared/utils/formateDate";

const TaskDetailsPage = () => {
  const { data: task, isLoading, isError } = useTask();

  if (isLoading) {
    return <AppLoader message="Loading task...." />;
  }

  if (isError) {
    <div className="rounded-2xl border bg-card p-8 text-center">
      <p className="font-medium">Failed to load task</p>

      <p className="mt-1 text-sm text-muted-foreground">
        Something went wrong while loading this task.
      </p>
    </div>;
  }

  if (!task) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center">
        <p className="font-medium">Task not found</p>

        <p className="mt-1 text-sm text-muted-foreground">
          The task you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Task Card */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        {/* Header */}
        <TaskHeader task={task} />

        {/* Content */}
        <div className="space-y-8 p-6">
          {/* Description */}
          <section>
            <h2 className="text-sm font-semibold text-foreground">
              Description
            </h2>

            <div className="mt-3 rounded-xl bg-muted/30 p-4">
              {task.description ? (
                <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                  {task.description}
                </p>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  No description provided.
                </p>
              )}
            </div>
          </section>

          {/* Metadata */}
          <section>
            <h2 className="text-sm font-semibold text-foreground">Details</h2>

            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Created by</p>
                <p className="mt-1 text-sm font-medium">{task.createdBy}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="mt-1 text-sm font-medium">
                  {formatDate(task.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Last Updated</p>
                <p className="mt-1 truncate text-sm font-medium">
                  {formatDate(task.updatedAt)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Task ID</p>
                <p className="mt-1 truncate text-sm font-medium">{task._id}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;

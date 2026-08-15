const ProjectCardSkeleton = () => {
  return (
    <div className="rounded-2xl border bg-card p-5">
      {/* top */}
      <div className="flex items-start justify-between">
        <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />

        <div className="h-7 w-7 animate-pulse rounded-lg bg-muted" />
      </div>

      {/* content */}
      <div className="mt-5 space-y-2">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />

        <div className="h-4 w-full animate-pulse rounded bg-muted" />

        <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
      </div>

      {/* footer */}
      <div className="mt-5 flex items-center justify-between">
        <div className="h-6 w-16 animate-pulse rounded-lg bg-muted" />

        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;

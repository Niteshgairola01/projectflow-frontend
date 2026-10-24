import { panel } from "../constants/dashboardStyles";

const DashboardSkeleton = () => {

  return (
    <div
      role="status"
      aria-label="Loading dashboard"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className={`${panel} motion-safe:animate-pulse`}>
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="my-4 h-9 w-16 rounded bg-muted" />
          <div className="h-3 w-32 rounded bg-muted" />
        </div>
      ))}
      <p className="text-sm text-muted-foreground">
        Loading your overview…
      </p>
    </div>
  );
};

export default DashboardSkeleton;

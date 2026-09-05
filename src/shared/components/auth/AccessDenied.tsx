import { ShieldX } from "lucide-react";

const AccessDenied = () => (
  <div className="rounded-2xl border bg-card p-10 text-center">
    <ShieldX className="mx-auto h-10 w-10 text-muted-foreground" />
    <h1 className="mt-4 text-xl font-semibold">Access denied</h1>
    <p className="mt-2 text-sm text-muted-foreground">
      You do not have permission to view this page.
    </p>
  </div>
);

export default AccessDenied;

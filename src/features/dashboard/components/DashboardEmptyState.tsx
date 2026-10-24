import { panel, focus } from "../constants/dashboardStyles";
import { Link } from "react-router-dom";
import { ArrowRight, Layers3 } from "lucide-react";
import { ROUTES } from "../../../shared/constants/routes";

const DashboardEmptyState = () => {

  return (
    <div className={`${panel} py-16 text-center`}>
      <Layers3 className="mx-auto mb-4 text-primary" size={40} />
      <h2 className="text-xl font-semibold">
        Great work starts with a workspace
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Create your first workspace to organize projects and bring your team
        together.
      </p>
      <Link
        to={ROUTES.WORKSPACES}
        className={`mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground ${focus}`}
      >
        Go to workspaces <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default DashboardEmptyState;

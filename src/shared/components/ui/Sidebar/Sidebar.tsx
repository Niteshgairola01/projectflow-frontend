import { LogOut } from "lucide-react";
import { useLogout } from "../../../../features/auth/hooks/useLogout";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { notify } from "../../../utils/toast";
import { Logo } from "../Logo/Logo";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { sidebarItems, type SidebarItem } from "../../../constants/sidebar";
import { useProject } from "../../../../features/projects/hooks/useProject";
import ProjectSideNavigation from "../../../../features/projects/components/ProjectSideNavigation";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      notify.success("Logged out successfully");
    } catch (error) {
      notify.error(getErrorMessage(error));
    }
  };
  const location = useLocation();

  const { projectId } = useParams();

  const currentWorkspace = useAppSelector(
    (state) => state.workspace.currentWorkspace
  );

  const { data: project } = useProject();

  const workspaceId = currentWorkspace?._id;

  const getItemPath = (key: string): string | null => {
    switch (key) {
      case "dashboard":
        return ROUTES.DASHBOARD;
      case "workspaces":
        return ROUTES.WORKSPACES;

      case "projects":
        return workspaceId ? `/workspaces/${workspaceId}/projects` : null;
      default:
        return null;
    }
  };

  const handleNavigation = (item: SidebarItem) => {
    const path = getItemPath(item.key);

    if (!path) {
      return;
    }

    navigate(path);
  };

  const isItemActive = (item: SidebarItem) => {
    const path = getItemPath(item.key);

    if (!path) {
      return false;
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <aside className="flex h-full w-full min-w-0 flex-col border-r bg-card">
      {/* Logo / Brand */}
      <div className="flex h-16 shrink-0 items-center border-b px-6 pr-14 lg:pr-6">
        <Logo />
      </div>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="min-h-0 flex-1 overflow-y-auto space-y-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          const disabled = item.requiresWorkspace && !currentWorkspace;

          const active = isItemActive(item);

          return (
            <button
              key={item.key}
              type="button"
              disabled={disabled}
              onClick={() => handleNavigation(item)}
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-colors

                ${
                  active
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }

                ${
                  disabled
                    ? "cursor-not-allowed opacity-40 hover:bg-transparent"
                    : ""
                }
              `}
            >
              <Icon size={19} />

              <span>{item.label}</span>
            </button>
          );
        })}

        {projectId && project && <ProjectSideNavigation project={project} />}
      </nav>

      {user && (
        <section aria-label="Account details" className="shrink-0 border-t p-4">
          <div className="flex min-w-0 items-center gap-3">
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {user.name.trim().charAt(0).toUpperCase() || "?"}
            </span>
            <div className="min-w-0">
              <p className="break-words text-sm font-medium">{user.name}</p>
              <p className="mt-0.5 break-all text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mt-3 flex h-10 w-full items-center gap-2 rounded-lg px-3 text-sm text-red-600 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400"
          >
            <LogOut aria-hidden="true" size={18} />
            {isLoggingOut ? "Logging out…" : "Logout"}
          </button>
        </section>
      )}
    </aside>
  );
};

export default Sidebar;

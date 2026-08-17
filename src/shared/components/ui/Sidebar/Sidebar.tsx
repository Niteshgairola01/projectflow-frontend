import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { sidebarItems } from "../../../constants/sidebar";

interface SidebarItem {
  label: string;
  key: string;
  icon: React.ElementType;
  requiresWorkspace?: boolean;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentWorkspace = useAppSelector(
    (state) => state.workspace.currentWorkspace
  );

  const workspaceId = currentWorkspace?._id;

  const getItemPath = (key: string): string | null => {
    switch (key) {
      case "overview":
        return ROUTES.DASHBOARD;

      case "workspaces":
        return ROUTES.WORKSPACES;

      case "projects":
        return workspaceId ? `/workspaces/${workspaceId}/projects` : null;

      case "tasks":
        return workspaceId ? `/workspaces/${workspaceId}/tasks` : null;

      case "calendar":
        return workspaceId ? `/workspaces/${workspaceId}/calendar` : null;

      case "team":
        return workspaceId ? `/workspaces/${workspaceId}/team` : null;

      case "reports":
        return workspaceId ? `/workspaces/${workspaceId}/reports` : null;

      case "settings":
        return workspaceId ? `/workspaces/${workspaceId}/settings` : null;

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
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo / Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-primary">ProjectFlow</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item: SidebarItem) => {
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
      </nav>

      {/* Current Workspace */}
      {currentWorkspace && (
        <div className="border-t p-4">
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
            Current Workspace
          </p>

          <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white">
              {currentWorkspace.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {currentWorkspace.name}
              </p>

              <p className="text-xs text-muted-foreground">Active workspace</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

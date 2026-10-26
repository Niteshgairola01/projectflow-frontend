// shared/components/navbar/Navbar.tsx

import { useAppSelector } from "../../../hooks/useAppSelector";
import { Menu } from "lucide-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar = ({ onToggleSidebar, sidebarOpen }: NavbarProps) => {
  const currentWorkspace = useAppSelector((state) => state.workspace.currentWorkspace);
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-card px-3 sm:px-6">
      {/* Left */}

      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
          aria-controls={sidebarOpen ? "mobile-sidebar" : undefined}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg hover:bg-muted lg:hidden"
        >
          <Menu size={22} />
        </button>
        {currentWorkspace && (
          <div aria-label="Current workspace" className="flex min-w-0 items-center gap-3">
            <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white">
              {currentWorkspace.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Current workspace</p>
              <p title={currentWorkspace.name} className="truncate text-sm font-medium">{currentWorkspace.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* Right */}

      <div className="flex shrink-0 items-center gap-1 sm:gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;

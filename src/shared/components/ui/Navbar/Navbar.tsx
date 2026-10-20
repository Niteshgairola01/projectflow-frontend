// shared/components/navbar/Navbar.tsx

import { LogOut, Menu } from "lucide-react";
import { useLogout } from "../../../../features/auth/hooks/useLogout";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { notify } from "../../../utils/toast";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setUser } from "../../../../features/auth/store/authSlice";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { tokenManager } from "../../../services/auth/tokenManager";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar = ({ onToggleSidebar, sidebarOpen }: NavbarProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { mutateAsync, isPending } = useLogout();

  const handleLogout = async () => {
    try {
      await mutateAsync();
      tokenManager.clearToken();
      notify.success("Logged out successfully");
      dispatch(setUser(null));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-card px-3 sm:px-6">
      {/* Left */}

      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button type="button" onClick={onToggleSidebar} aria-label="Open navigation menu" aria-expanded={sidebarOpen} aria-controls={sidebarOpen ? "mobile-sidebar" : undefined} className="flex size-10 shrink-0 items-center justify-center rounded-lg hover:bg-muted lg:hidden">
          <Menu size={22} />
        </button>
        <h1 className="truncate text-sm font-semibold sm:text-base">ProjectFlow</h1>
      </div>

      {/* Right */}

      <div className="flex shrink-0 items-center gap-1 sm:gap-4">
        <ThemeToggle />
        <button
          type="button"
          disabled={isPending}
          className="h-10 px-3 rounded-xl border flex items-center justify-center gap-3 disabled:opacity-50"
          onClick={handleLogout}
          aria-label={isPending ? "Logging out" : "Logout"}
        >
          <span className="hidden sm:inline">{isPending ? "Logging out…" : "Logout"}</span>
          <LogOut size={18} />
        </button>

        {/* User */}

        <div title={user?.name} aria-label={user ? `Signed in as ${user.name}` : "User"} className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
            {user?.name.trim().charAt(0).toUpperCase() || "?"}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;

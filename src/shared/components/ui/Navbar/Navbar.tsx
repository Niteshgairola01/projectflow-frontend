// shared/components/navbar/Navbar.tsx

import { LogOut } from "lucide-react";
import { useLogout } from "../../../../features/auth/hooks/useLogout";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { notify } from "../../../utils/toast";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setUser } from "../../../../features/auth/store/authSlice";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { tokenManager } from "../../../services/auth/tokenManager";

const Navbar = () => {
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
    <header className="h-16 border-b border-gray-200 bg-card px-6 flex items-center justify-between">
      {/* Left */}

      <div className="flex items-center gap-4">
        <h1 className="font-semibold">ProjectFlow</h1>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled={isPending}
          className="h-10 px-3 rounded-xl border flex items-center justify-center gap-3 disabled:opacity-50"
          onClick={handleLogout}
        >
          {isPending ? "Logging out…" : "Logout"}
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

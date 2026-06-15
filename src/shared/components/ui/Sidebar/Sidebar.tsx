// shared/components/sidebar/Sidebar.tsx

import { NavLink } from "react-router-dom";
import { Settings } from "lucide-react";
import { sidebarItems } from "../../../constants/sidebar";

const Sidebar = () => {
  return (
    <aside
      className="
      hidden
      lg:flex
      lg:w-64
      lg:flex-col
      border-r
      border-border
      border-gray-200
      bg-card
      "
    >
      {/* Logo */}

      <div className="h-16 px-6 flex items-center border-b border-gray-200">
        <div className="h-8 w-8 rounded-lg bg-primary" />

        <span className="ml-3 font-semibold">ProjectFlow</span>
      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                transition-colors

                ${isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"}
                `
              }
            >
              <Icon size={18} />

              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings */}

      <div className="border-t border-gray-200 p-4">
        <NavLink
          to="/settings"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            hover:bg-muted
          "
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

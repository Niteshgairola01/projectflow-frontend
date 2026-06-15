// shared/components/navbar/Navbar.tsx

import { Bell, Search, ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <header
      className="
      h-16
      border-b
      border-gray-200
      bg-card
      px-6
      flex
      items-center
      justify-between
      "
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        <h1 className="font-semibold">Workspaces</h1>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Search */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-2
          border
          rounded-xl
          px-3
          h-10
          w-72
          "
        >
          <Search size={16} />

          <input
            placeholder="Search anything..."
            className="
              flex-1
              bg-transparent
              outline-none
              text-sm
            "
          />
        </div>

        {/* Notification */}

        <button
          className="
          h-10
          w-10
          rounded-xl
          border
          flex
          items-center
          justify-center
          "
        >
          <Bell size={18} />
        </button>

        {/* User */}

        <button
          className="
          flex
          items-center
          gap-2
          "
        >
          <div
            className="
            h-10
            w-10
            rounded-full
            bg-primary
            text-white
            flex
            items-center
            justify-center
            font-medium
            "
          >
            N
          </div>

          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;

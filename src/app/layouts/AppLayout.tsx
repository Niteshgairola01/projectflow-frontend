import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/ui/Navbar/Navbar";
import Sidebar from "../../shared/components/ui/Sidebar/Sidebar";

const AppLayout = () => {
  return (
    <div className="h-screen flex bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main
          className="
          flex-1
          overflow-y-auto
          p-6
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

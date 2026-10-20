import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import Navbar from "../../shared/components/ui/Navbar/Navbar";
import Sidebar from "../../shared/components/ui/Sidebar/Sidebar";

const MobileSidebar = ({ onClose }: { onClose: () => void }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.querySelector<HTMLButtonElement>('[aria-controls="mobile-sidebar"]');
    dialog?.showModal();
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => {
      if (desktop.matches) onClose();
    };
    handleResize();
    desktop.addEventListener("change", handleResize);
    return () => {
      dialog?.close();
      desktop.removeEventListener("change", handleResize);
      if (!desktop.matches) trigger?.focus();
    };
  }, [onClose]);

  return (
    <dialog
      id="mobile-sidebar"
      ref={dialogRef}
      aria-label="Navigation menu"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget ||
          (event.target as HTMLElement).closest("nav a, nav button:not(:disabled)")) {
          onClose();
        }
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 text-foreground backdrop:bg-black/40 backdrop:backdrop-blur-sm lg:hidden"
    >
      <div className="relative h-full w-72 max-w-[calc(100vw-3rem)] bg-card shadow-xl">
        <button type="button" onClick={onClose} aria-label="Close navigation menu" className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-lg hover:bg-muted">
          <X size={20} />
        </button>
        <Sidebar />
      </div>
    </dialog>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const [sidebarLocation, setSidebarLocation] = useState<string | null>(null);
  const sidebarOpen = sidebarLocation === location.key;
  const closeSidebar = useCallback(() => setSidebarLocation(null), []);
  if (sidebarLocation !== null && sidebarLocation !== location.key) {
    setSidebarLocation(null);
  }

  return (
    <div className="flex h-dvh min-w-0 bg-background">
      <div className="hidden h-full w-64 shrink-0 lg:block"><Sidebar /></div>
      {sidebarOpen && <MobileSidebar onClose={closeSidebar} />}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden" inert={sidebarOpen}>
        <Navbar onToggleSidebar={() => setSidebarLocation(sidebarOpen ? null : location.key)} sidebarOpen={sidebarOpen} />

        <main
          className="
          flex-1
          min-h-0 min-w-0
          overflow-y-auto
          p-3 sm:p-5 lg:p-6
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

import { FolderKanban } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <FolderKanban size={24} className="text-primary" />

      <span className="font-bold">ProjectFlow</span>
    </div>
  );
}

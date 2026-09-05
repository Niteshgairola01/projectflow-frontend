import { Link } from "react-router-dom";
import { ArrowUpRight, FolderKanban, Shield, Users } from "lucide-react";

import type { User } from "../../auth/types/auth.types";
import type { Workspace } from "../types/workspace.types";
import { Card } from "../../../shared/components/ui/Card/Card";

interface WorkspacesListProps {
  workspaces: Workspace[];
  user: User;
}

const WorkspacesList = ({ workspaces, user }: WorkspacesListProps) => {
  return (
    <div>
      {/* Section Header */}
      <div className="mt-6 mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Your Workspaces
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Workspaces you're currently a member of.
          </p>
        </div>

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {workspaces.length} Workspaces
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {workspaces.map((workspace) => {
          const member = workspace.members.find(
            (member) => member.user._id === user?._id,
          );

          const visibleMembers = workspace.members.slice(0, 4);

          const remainingMembers =
            workspace.members.length - visibleMembers.length;

          return (
            <Link
              key={workspace._id}
              to={`/workspaces/${workspace._id}`}
              className="group block"
            >
              <Card className="flex h-full flex-col p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Workspace Icon */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-semibold text-white shadow-sm"
                      style={{
                        backgroundColor: workspace.color || "#6C63FF",
                      }}
                    >
                      {workspace.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-foreground">
                        {workspace.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield className="h-3.5 w-3.5" />

                        <span>{member?.role || "Member"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition group-hover:bg-primary/10 group-hover:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-muted/40 p-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />

                      <span className="text-xs">Members</span>
                    </div>

                    <p className="mt-1.5 text-lg font-semibold text-foreground">
                      {workspace.members.length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-muted/40 p-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FolderKanban className="h-4 w-4" />

                      <span className="text-xs">Projects</span>
                    </div>

                    <p className="mt-1.5 text-lg font-semibold text-foreground">
                      {workspace.projectsCount ?? 0}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  {/* Member avatars */}
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {visibleMembers.map((member) => (
                        <div
                          key={member.user._id}
                          title={member.user.name}
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary/10 text-[10px] font-semibold uppercase text-primary"
                        >
                          {member.user.name?.slice(0, 1).toUpperCase()}{" "}
                        </div>
                      ))}

                      {remainingMembers > 0 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-[10px] font-semibold text-muted-foreground">
                          +{remainingMembers}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Active
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WorkspacesList;

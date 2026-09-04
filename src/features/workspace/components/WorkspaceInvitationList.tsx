import { Clock3, Mail, MoreHorizontal, Search } from "lucide-react";
import { Input } from "../../../shared/components/ui/Input/Input";
import type { Invitation } from "../../invitation/types/invitation.types";
import { Card } from "../../../shared/components/ui/Card/Card";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import { formatDate } from "../../../shared/utils/formateDate";
import WorkspaceInvitaitonsListItem from "./workspaceInvitaitonsListItem";

interface WorkspaceInvitationListProps {
  invitations: Invitation[];
  isLoading: boolean;
  isError: boolean;
}

const TableHeader = () => {
  return (
    <div>
      <h2 className="font-semibold text-foreground">Invitations</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Invitations sent to users.
      </p>
    </div>
  );
};

const WorkspaceInvitationList = ({
  invitations,
  isLoading,
  isError,
}: WorkspaceInvitationListProps) => {
  if (isLoading) {
    return (
      <Card className="p-3">
        <TableHeader />
        <AppLoader message="Loading Invitations...." />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-3">
        <TableHeader />
        <div className=" text-center p-6">
          <p className="font-medium">Failed to load invitations.</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {/* Table Header */}
      <div className="flex flex-col gap-4 border-b px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <TableHeader />

        {/* Search - UI only */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input className="pl-9" placeholder="Search by email..." />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Invited User
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Invited By
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Sent On
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Expires
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {invitations?.map((invitation) => (
              <WorkspaceInvitaitonsListItem invitation={invitation} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/20 px-6 py-3">
        <p className="text-sm text-muted-foreground">
          {invitations?.length === 1 ? "Invitation" : "Invitations"}
        </p>
      </div>
    </Card>
  );
};

export default WorkspaceInvitationList;

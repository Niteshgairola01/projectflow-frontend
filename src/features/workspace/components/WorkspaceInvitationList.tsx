import { Clock3, Mail, MoreHorizontal, Search } from "lucide-react";
import { Input } from "../../../shared/components/ui/Input/Input";
import type { Invitation } from "../../invitation/types/invitation.types";
import { Card } from "../../../shared/components/ui/Card/Card";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import { formatDate } from "../../../shared/utils/formateDate";

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

const invitationStatusStyles = {
  PENDING: {
    badge: "bg-amber-50 text-amber-700 ring-amber-600/10",
    dot: "bg-amber-500",
  },
  ACCEPTED: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    dot: "bg-emerald-500",
  },
  EXPIRED: {
    badge: "bg-slate-100 text-slate-600 ring-slate-500/10",
    dot: "bg-slate-400",
  },
  CANCELLED: {
    badge: "bg-red-50 text-red-700 ring-red-600/10",
    dot: "bg-red-500",
  },
};

const WorkspaceInvitationList = ({
  invitations,
  isLoading,
  isError,
}: WorkspaceInvitationListProps) => {
  console.log("invitations", invitations);

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
              <tr
                key={invitation._id}
                className="transition-colors hover:bg-muted/30"
              >
                {/* Email */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {invitation.email}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Waiting to join workspace
                      </p>
                    </div>
                  </div>
                </td>

                {/* Invited By */}
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">
                    {invitation.invitedBy?.name}
                  </p>
                </td>

                {/* Created */}
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(invitation.createdAt)}
                  </p>
                </td>

                {/* Expiry */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock3 className="h-4 w-4" />

                    {formatDate(invitation.expiresAt)}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${invitationStatusStyles[invitation.status].badge}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${invitationStatusStyles[invitation.status].dot}`}
                    />

                    {invitation.status}
                  </span>
                </td>
                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Manage invitation for ${invitation.email}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
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

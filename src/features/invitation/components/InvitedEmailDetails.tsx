import { Mail } from "lucide-react";
import type { Invitation } from "../types/invitation.types";

interface InvitedEmailDetails {
  invitation: Invitation;
}

const InvitedEmailDetails = ({ invitation }: InvitedEmailDetails) => {
  return (
    <div className="rounded-2xl border bg-muted/20 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm">
          <Mail className="h-5 w-5 text-primary" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Invitation sent to
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-foreground">
            {invitation.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitedEmailDetails;

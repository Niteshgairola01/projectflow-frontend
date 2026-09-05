import { CheckCircle2 } from "lucide-react";
import type { Invitation } from "../types/invitation.types";

interface InvitedBySectionProps {
  invitation: Invitation;
}

const InvitedBySection = ({ invitation }: InvitedBySectionProps) => {
  return (
    <div className="rounded-2xl border bg-muted/20 p-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold uppercase text-primary">
            {invitation.invitedBy.name.slice(0, 1)}
          </div>

          <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-emerald-500">
            <CheckCircle2 className="h-3 w-3 text-white" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Invited by
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-foreground">
            {invitation.invitedBy.name}
          </p>

          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {invitation.invitedBy.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitedBySection;

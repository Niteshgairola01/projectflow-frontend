import { ShieldCheck } from "lucide-react";
import type { Invitation } from "../types/invitation.types";
import type { User } from "../../auth/types/auth.types";

interface LoggedInWithWrongAccountProps {
  invitation: Invitation;
  user: User;
}

const LoggedInWithWrongAccount = ({
  invitation,
  user,
}: LoggedInWithWrongAccountProps) => {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

        <div>
          <p className="text-sm font-semibold text-red-700">
            You're signed in with a different account
          </p>

          <p className="mt-2 text-sm leading-6 text-red-600">
            This invitation was sent to{" "}
            <span className="font-semibold">{invitation.email}</span>, but
            you're currently signed in as{" "}
            <span className="font-semibold">{user?.email}</span>.
          </p>

          <p className="mt-2 text-sm text-red-600">
            Please login using the invited email address to continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoggedInWithWrongAccount;

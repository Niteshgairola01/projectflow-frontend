import { Sparkles } from "lucide-react";

import { Card } from "../../../shared/components/ui/Card/Card";
import { useGetInvitationByToken } from "../hooks/useGetInvitationByToken";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import InvitationNotFound from "../components/InvitationNotFound";
import { INVITATION_STATUSES } from "../constants/invitationStatuses";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import HeroSection from "../components/HeroSection";
import InvitedBySection from "../components/InvitedBySection";
import InvitedEmailDetails from "../components/InvitedEmailDetails";
import NotLoggedIn from "../components/NotLoggedIn";
import LoggedInWithWrongAccount from "../components/LoggedInWithWrongAccount";
import LoggedInWithCorrectAccount from "../components/LoggedInWithCorrectAccount";

const InvitationPage = () => {
  const { data: invitation, isLoading, isError } = useGetInvitationByToken();
  const { user } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <AppLoader message="Loading invitation" />;
  }

  if (!invitation || isError) {
    return <InvitationNotFound />;
  }

  if (
    invitation.status === INVITATION_STATUSES.ACCEPTED ||
    invitation.status === INVITATION_STATUSES.CANCELLED ||
    invitation.status === INVITATION_STATUSES.EXPIRED
  ) {
    return <InvitationNotFound />;
  }

  const isLoggedIn = Boolean(user);

  const isCorrectUser =
    user?.email?.toLowerCase() === invitation.email.toLowerCase();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-10">
      {/* Decorative background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[380px] w-[380px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-[-120px] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="w-full max-w-xl">
          {/* Badge */}

          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Workspace Invitation
            </div>
          </div>

          <Card className="overflow-hidden rounded-3xl border bg-card/95 shadow-2xl shadow-black/5 backdrop-blur">
            {/* Hero */}
            <HeroSection invitation={invitation} />

            {/* Invitation details */}
            <div className="space-y-4 px-6 py-6 sm:px-8">
              {/* Invited by */}
              <InvitedBySection invitation={invitation} />

              {/* Invitation email */}
              <InvitedEmailDetails invitation={invitation} />
            </div>

            {/* Actions */}

            <div className="border-t bg-muted/10 px-6 py-6 sm:px-8">
              {/* NOT LOGGED IN */}
              {!isLoggedIn && <NotLoggedIn invitation={invitation} />}

              {/* LOGGED IN BUT WRONG ACCOUNT */}
              {isLoggedIn && !isCorrectUser && (
                <LoggedInWithWrongAccount invitation={invitation} user={user} />
              )}

              {/* LOGGED IN WITH CORRECT ACCOUNT */}
              {isLoggedIn && isCorrectUser && (
                <LoggedInWithCorrectAccount invitation={invitation} user={user} />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvitationPage;

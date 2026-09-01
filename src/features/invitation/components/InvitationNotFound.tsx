import { ArrowLeft, CircleAlert, MailX, ShieldCheck } from "lucide-react";

import { Button } from "../../../shared/components/ui/Button/Button";
import { Card } from "../../../shared/components/ui/Card/Card";
import { Link } from "react-router-dom";

const InvitationNotFound = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-10">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-[-180px] right-[-120px] h-[380px] w-[380px] rounded-full bg-red-500/5 blur-3xl" />

        <div className="absolute left-[-120px] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Badge */}
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <CircleAlert className="h-3.5 w-3.5 text-red-500" />
              Invitation Unavailable
            </div>
          </div>

          <Card className="overflow-hidden rounded-3xl border bg-card/95 shadow-2xl shadow-black/5 backdrop-blur">
            {/* Main Content */}
            <div className="relative overflow-hidden px-6 py-10 text-center sm:px-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-red-500/5 to-transparent" />

              <div className="relative">
                {/* Error Icon */}
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-3xl bg-red-500/10 blur-xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/10 bg-red-50 shadow-sm">
                    <MailX className="h-8 w-8 text-red-500" />
                  </div>
                </div>

                <p className="mt-6 text-sm font-medium text-red-500">
                  Invitation not found
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  This invitation isn't available
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  We couldn't find an invitation associated with this link. The
                  invitation may have been removed, cancelled, or the link may
                  be incorrect.
                </p>
              </div>
            </div>

            {/* Information */}
            <div className="border-t px-6 py-6 sm:px-8">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background shadow-sm">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      What can you do?
                    </p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Check that you opened the complete invitation link, or ask
                      the workspace administrator to send you a new invitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t bg-muted/10 px-6 py-6 sm:px-8">
              <Link to="/login">
                <Button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl">
                  <ArrowLeft className="h-4 w-4" />
                  Go to ProjectFlow
                </Button>
              </Link>
            </div>
          </Card>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            If you believe this is a mistake, contact the person who invited
            you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitationNotFound;

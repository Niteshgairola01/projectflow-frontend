import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../../../shared/components/ui/Button/Button";
import type { Invitation } from "../types/invitation.types";
import { useNavigate, useParams } from "react-router-dom";

interface NotLoggedInProps {
  invitation: Invitation;
}

const NotLoggedIn = ({ invitation }: NotLoggedInProps) => {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/login?invitation=${token}`);
  };

  const handleRegister = () => {
    navigate(`/register?invitation=${token}`);
  };

  return (
    <>
      <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <ShieldCheck className="h-4 w-4 text-primary" />
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">
              Sign in to continue
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Login or create an account using{" "}
              <span className="font-medium text-foreground">
                {invitation.email}
              </span>{" "}
              before accepting this invitation.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <Button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl"
          onClick={handleLogin}
        >
          Login to Continue
          <ArrowRight className="h-4 w-4" />
        </Button>

        <button
          className="h-11 w-full rounded-xl border px-4 py-2"
          onClick={handleRegister}
        >
          Create an Account
        </button>
      </div>
    </>
  );
};

export default NotLoggedIn;

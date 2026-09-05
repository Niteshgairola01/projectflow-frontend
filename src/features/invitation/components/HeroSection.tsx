import { Users } from "lucide-react";
import type { Invitation } from "../types/invitation.types";

interface HeroSectionProps {
  invitation: Invitation;
}

const HeroSection = ({ invitation }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden border-b px-6 py-9 text-center sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/8 to-transparent" />

      <div className="relative">
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-xl" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 shadow-sm">
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-muted-foreground">
          You've been invited to collaborate
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Join <span className="text-primary">{invitation.workspace.name}</span>
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Become part of this workspace and start collaborating on projects,
          tasks, and shared work with your team.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;

import type { ReactNode } from "react";

export const DEMO_CREDENTIALS = {
  email: "projectflow.dummy@gmail.com",
  password: "12345678",
};

export function DemoAccountCard({ children }: { children: ReactNode }) {
  return (
    <section
      aria-label="Demo account"
      className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm"
    >
      <p className="font-semibold text-foreground">Try ProjectFlow</p>
      <p className="mt-1 text-muted-foreground">
        Explore the app with our demo account.
      </p>
      <dl className="mt-3 space-y-1">
        <div>
          <dt className="inline text-muted-foreground">Email: </dt>
          <dd className="inline break-all font-medium text-foreground">
            {DEMO_CREDENTIALS.email}
          </dd>
        </div>
        <div>
          <dt className="inline text-muted-foreground">Password: </dt>
          <dd className="inline font-medium text-foreground">
            {DEMO_CREDENTIALS.password}
          </dd>
        </div>
      </dl>
      {children}
    </section>
  );
}

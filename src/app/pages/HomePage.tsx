import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FolderKanban,
  LayoutDashboard,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Logo } from "../../shared/components/ui/Logo/Logo";
import ThemeToggle from "../../shared/components/ui/ThemeToggle/ThemeToggle";
import { ROUTES } from "../../shared/constants/routes";

const features = [
  {
    icon: Users,
    title: "A home for your team",
    description:
      "Create workspaces, invite collaborators, and manage member roles so everyone has the access they need.",
  },
  {
    icon: FolderKanban,
    title: "Plans that move forward",
    description:
      "Organize projects and tasks, assign responsibility, set due dates, and move work through each stage.",
  },
  {
    icon: LayoutDashboard,
    title: "The bigger picture",
    description:
      "See your work in one dashboard and keep track of progress across your projects and workspaces.",
  },
];
const previewColumns = [
  {
    title: "To do",
    color: "bg-slate-400",
    tasks: ["Plan the next milestone", "Gather team feedback"],
  },
  {
    title: "In progress",
    color: "bg-amber-400",
    tasks: ["Build the first prototype", "Review project details"],
  },
  {
    title: "Done",
    color: "bg-emerald-400",
    tasks: ["Bring the team together"],
  },
];
const primaryLink =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export default function HomePage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "ProjectFlow | Bring your team’s work together";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-lg focus:bg-card focus:p-4"
      >
        Skip to content
      </a>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to={ROUTES.HOME} aria-label="ProjectFlow home">
            <Logo />
          </Link>
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-3 sm:gap-6"
          >
            <Link
              to={ROUTES.PRIVACY}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="text-sm font-medium hover:text-primary"
            >
              Sign in
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main id="main-content">
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                <span className="size-1.5 rounded-full bg-primary" /> Your
                people. Your projects. One place.
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Less scattered.
                <br />
                <span className="text-primary">More in sync.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                ProjectFlow is a collaborative project management app that
                brings your team’s workspaces, projects, and tasks together.
                Turn a shared plan into clear next steps.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={ROUTES.REGISTER} className={primaryLink}>
                  Create an account <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  to={ROUTES.LOGIN}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-muted"
                >
                  Sign in to your workspace
                </Link>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                A little structure. A lot of possibility.
              </p>
            </div>
            <div className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-primary/5 sm:p-6">
              <div className="flex items-center gap-3 border-b border-border pb-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FolderKanban size={21} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">The next chapter</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Team workspace / Project board
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {previewColumns.map((column, index) => (
                  <div key={column.title} className="min-w-0">
                    <p className="mb-3 flex items-center gap-1.5 text-xs font-medium">
                      <span
                        aria-hidden="true"
                        className={`size-1.5 shrink-0 rounded-full ${column.color}`}
                      />
                      {column.title}
                    </p>
                    <div className="space-y-3">
                      {column.tasks.map((task) => (
                        <div
                          key={task}
                          className="rounded-xl border border-border bg-background p-2.5 sm:p-3"
                        >
                          <span className="text-[10px] font-medium text-primary">
                            Launch plan
                          </span>
                          <p className="mt-2 text-xs font-medium leading-5">
                            {task}
                          </p>
                          <div className="mt-4 flex items-center justify-between gap-1 border-t border-border pt-3">
                            <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary">
                              PF
                            </span>
                            {index === 2 && (
                              <Check
                                size={14}
                                className="text-emerald-500"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Illustrative project board · Your next idea starts here.
              </p>
            </div>
          </div>
        </section>
        <section
          aria-labelledby="features-title"
          className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Make room for good work
          </p>
          <h2
            id="features-title"
            className="mt-3 text-3xl font-semibold tracking-tight"
          >
            From the first idea to the final task.
          </h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {[
              "Create a workspace",
              "Invite your team",
              "Plan and track your work",
            ].map((step, i) => (
              <p key={step} className="flex items-center gap-2">
                <span className="text-primary">0{i + 1}</span>
                {step}
              </p>
            ))}
          </div>
        </section>
        <section
          aria-labelledby="data-title"
          className="border-y border-border bg-card"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
            <div>
              <ShieldCheck
                className="text-primary"
                size={28}
                aria-hidden="true"
              />
              <h2
                id="data-title"
                className="mt-4 text-3xl font-semibold tracking-tight"
              >
                Clear about your information.
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                We use your name and email to manage your account and
                collaboration. Workspace, project, and task information powers
                the features you use and is shared with collaborators according
                to their access.
              </p>
              <Link
                to={ROUTES.PRIVACY}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
              >
                Read our privacy policy{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Mail
                  size={22}
                  className="shrink-0 text-primary"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold">
                  Why ProjectFlow uses Gmail
                </h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                ProjectFlow uses Google’s Gmail API through its designated
                sender account to deliver workspace invitations, password reset
                links, and password change notifications. Google processes the
                recipient address and email content to deliver these messages.
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm leading-6">
                <CheckCircle2
                  size={18}
                  className="mt-1 shrink-0 text-primary"
                  aria-hidden="true"
                />
                Receiving an email or creating a ProjectFlow account does not
                give us access to your Gmail inbox.
              </p>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <h2 className="text-3xl font-semibold tracking-tight">
            Give your next project a place to grow.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Bring the team together. Find your flow.
          </p>
          <Link to={ROUTES.REGISTER} className={`${primaryLink} mt-7`}>
            Get started <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-7 text-sm sm:px-8">
          <Logo />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground">
            <Link to={ROUTES.PRIVACY} className="hover:text-primary">
              Privacy policy
            </Link>
            <a
              href="mailto:projectflow.teams@gmail.com"
              className="hover:text-primary"
            >
              Contact ProjectFlow
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { Logo } from "../../shared/components/ui/Logo/Logo";
import ThemeToggle from "../../shared/components/ui/ThemeToggle/ThemeToggle";
import { ROUTES } from "../../shared/constants/routes";

const sections = [
  {
    id: "information", title: "Information we collect",
    paragraphs: [
      "Account information includes your name, email address, profile information you provide, and a securely hashed password. We also store session and password recovery information needed to keep your account working.",
      "Workspace information includes the workspaces, projects, tasks, descriptions, comments, assignments, memberships, invitations, and related activity you or your collaborators create. If someone invites you before you register, we process your email address and invitation details to deliver that invitation.",
      "Our hosting and infrastructure providers may process technical information such as IP addresses, request details, device or browser information, and error logs to operate and protect the service.",
    ],
  },
  {
    id: "use", title: "How we use information",
    paragraphs: [
      "We use information to create and authenticate accounts, organize collaborative work, manage permissions, deliver workspace invitations and password recovery emails, respond to support requests, and troubleshoot or prevent abuse.",
      "We do not sell personal information or use Google user data for advertising, profiling for advertising, or training artificial intelligence models.",
    ],
  },
  {
    id: "gmail", title: "Gmail access and service emails",
    paragraphs: [
      "ProjectFlow uses the Gmail API to send transactional messages from a designated ProjectFlow sender account: workspace invitations, password reset links, and password change notifications. Google processes recipient addresses and message content to deliver those emails.",
      "The sender account authorizes this integration through Google OAuth. Sender OAuth credentials and tokens are stored on the backend and used for email delivery. Receiving a ProjectFlow email or registering an account does not grant ProjectFlow access to your Gmail inbox. The current integration does not read recipients’ inboxes, contacts, or existing messages.",
      "ProjectFlow’s use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy and the Google Workspace API User Data and Developer Policy, including their Limited Use requirements.",
    ],
  },
  {
    id: "sharing", title: "When information is shared",
    paragraphs: [
      "Workspace collaborators can see account and work information made available through their membership and permissions. Workspace and project administrators manage access, so only add information you intend to share with the relevant team.",
      "Service providers process information needed to host the application, store data, and deliver emails. The current deployment uses Vercel for the frontend, Render for the backend, a MongoDB database, and Google for Gmail delivery. Providers may process information in countries other than your own, under their applicable terms and privacy policies.",
      "We may disclose information when required by applicable law or when reasonably necessary to address fraud, security incidents, or threats to the rights and safety of users. We do not share Google user data for unrelated purposes.",
    ],
  },
  {
    id: "storage", title: "Cookies and browser storage",
    paragraphs: [
      "ProjectFlow uses an authentication cookie to maintain and renew your session, and browser storage to remember your theme preference. Blocking cookies can prevent sign-in from working. You can clear cookies and stored preferences through your browser settings.",
    ],
  },
  {
    id: "retention", title: "Retention and security",
    paragraphs: [
      "We retain account and workspace information to provide the service and address legitimate operational, security, and legal needs. Password reset links expire after 15 minutes and workspace invitation links expire after seven days. Link expiration does not necessarily delete the associated database record.",
      "The application uses password hashing, access controls, and expiring authentication and recovery tokens to protect information. No online service or storage system can guarantee absolute security. Do not place passwords, payment details, or other highly sensitive information in shared tasks or comments.",
    ],
  },
  {
    id: "choices", title: "Your choices and requests",
    paragraphs: [
      "To request access to, correction of, or deletion of your personal information, contact projectflow.teams@gmail.com from the email address associated with your account. We may need to verify your identity before acting on a request. You can also contact your workspace administrator about information shared within their workspace.",
      "Some shared workspace content may need to be retained for collaborators or for legal and security reasons. We will explain any relevant limits when responding to your request. The authorized sender can revoke ProjectFlow’s Google access through their Google Account third-party connections settings; doing so stops service email delivery until access is restored.",
    ],
  },
  {
    id: "updates", title: "Changes and contact",
    paragraphs: [
      "We may update this policy as ProjectFlow changes. We will publish the revised policy here with an updated date and provide additional notice when required. For privacy questions or concerns, email projectflow.teams@gmail.com.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("information");

  useEffect(() => {
    let frame: number | undefined;
    const updateActiveSection = () => {
      frame = undefined;
      const readingLine = Math.min(160, window.innerHeight * 0.25);
      let current = "information";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= readingLine) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(updateActiveSection);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = "Privacy Policy | ProjectFlow";
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to={ROUTES.HOME} aria-label="ProjectFlow home"><Logo /></Link>
          <ThemeToggle />
        </div>
      </header>
      <main id="main-content" className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link to={ROUTES.HOME} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} aria-hidden="true" /> Back to ProjectFlow
        </Link>
        <div className="mt-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            <ShieldCheck size={16} aria-hidden="true" /> Your information, explained
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy policy</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">ProjectFlow helps teams organize their work. This policy explains what information we handle, why we need it, and the choices available to you.</p>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: <time dateTime="2026-10-27">October 27, 2026</time></p>
        </div>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Privacy policy contents" className="rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
            <ol className="space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={activeSection === section.id ? "location" : undefined}
                    className={`block rounded-lg border-l-2 px-3 py-2 text-sm leading-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${activeSection === section.id ? "border-primary bg-primary/10 font-semibold text-primary" : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="min-w-0 space-y-10">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-8 border-b border-border pb-10">
                <h2 id={`${section.id}-title`} className="text-xl font-semibold tracking-tight">{index + 1}. {section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-7 text-muted-foreground">{paragraph}</p>)}
                {section.id === "gmail" && <div className="mt-4 flex flex-col items-start gap-3 text-sm">
                  <a className="text-primary underline underline-offset-4" href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>
                  <a className="text-primary underline underline-offset-4" href="https://developers.google.com/workspace/workspace-api-user-data-developer-policy">Google Workspace API User Data and Developer Policy</a>
                </div>}
              </section>
            ))}
            <aside className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold">Have a privacy question?</h2>
              <p className="mt-2 leading-7 text-muted-foreground">Contact the ProjectFlow team about your information or a privacy request.</p>
              <a href="mailto:projectflow.teams@gmail.com" className="mt-4 inline-flex items-center gap-2 break-all text-primary underline underline-offset-4"><Mail size={18} aria-hidden="true" />projectflow.teams@gmail.com</a>
            </aside>
          </article>
        </div>
      </main>
      <footer className="border-t border-border px-5 py-6 text-center text-sm text-muted-foreground">ProjectFlow · Work together with clarity.</footer>
    </div>
  );
}

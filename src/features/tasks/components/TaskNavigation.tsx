import { Activity, FileText, MessageSquare } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export type TaskSection = "details" | "comments" | "activity";

interface TaskNavigationProps {
  activeSection: TaskSection;
}

const sections = [
  { key: "details", title: "Details", icon: FileText },
  { key: "comments", title: "Comments", icon: MessageSquare },
  { key: "activity", title: "Activity", icon: Activity },
] as const;

const TaskNavigation = ({ activeSection }: TaskNavigationProps) => {
  const [searchParams] = useSearchParams();

  return (
    <nav aria-label="Task navigation" className="flex gap-4 overflow-x-auto border-b px-4 sm:gap-6 sm:px-6">
      {sections.map(({ key, title, icon: Icon }) => {
        const params = new URLSearchParams(searchParams);
        if (key === "details") params.delete("section");
        else params.set("section", key);
        const isActive = activeSection === key;

        return (
          <Link
            key={key}
            to={{ search: params.toString() ? `?${params}` : "" }}
            preventScrollReset
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon aria-hidden="true" size={17} />
            <span>{title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default TaskNavigation;

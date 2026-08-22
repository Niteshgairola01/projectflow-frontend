import { NavLink } from "react-router-dom";

interface ProjectNavigationItemProps {
  title: string;
  path: string;
  children: React.ReactNode;
}

const ProjectNavigationItem = ({
  path,
  title,
  children,
}: ProjectNavigationItemProps) => {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        `inline-flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-white text-muted-foreground hover:text-foreground"
                }
            `
      }
    >
      {children}
      <span>{title}</span>
    </NavLink>
  );
};

export default ProjectNavigationItem;

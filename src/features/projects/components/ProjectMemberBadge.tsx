import type { ProjectMemberRole } from "../types/projectMember.types";

interface ProjectMemberBadgeProps {
  role: ProjectMemberRole;
}

const ProjectMemberBadge = ({ role }: ProjectMemberBadgeProps) => {
  const styles = {
    PROJECT_ADMIN: "bg-indigo-50 text-indigo-700 ring-indigo-600/10",
    MEMBER: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  };

  return (
    <span
      className={`
        inline-flex rounded-full px-2.5 py-1
        text-xs font-medium ring-1 ring-inset
        ${styles[role]}
      `}
    >
      {role === "PROJECT_ADMIN" ? "Project Admin" : "Member"}
    </span>
  );
};

export default ProjectMemberBadge;

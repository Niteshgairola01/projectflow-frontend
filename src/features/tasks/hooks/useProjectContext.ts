import { useOutletContext } from "react-router-dom";
import type { Project } from "../../projects/types/project.types";

interface ProjectLayoutContext {
  project: Project;
}

export const useProjectContext = () => {
  return useOutletContext<ProjectLayoutContext>();
};

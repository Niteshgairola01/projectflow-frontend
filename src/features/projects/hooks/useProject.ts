import { useQuery } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
import { useParams } from "react-router-dom";
import { projectKeys } from "../constants/project.keys";
import { notify } from "../../../shared/utils/toast";

export const useProject = () => {
  const { workspaceId, projectId } = useParams();

  return useQuery({
    queryKey: projectKeys.detail(workspaceId ?? "", projectId ?? ""),

    queryFn: () => {
      if (!workspaceId) {
        notify.error("Workspace not found");
        return;
      }

      if (!projectId) {
        notify.error("Project not found");
        return;
      }

      return projectApi.getProjectById(workspaceId, projectId);
    },

    enabled: !!workspaceId && !!projectId,
  });
};

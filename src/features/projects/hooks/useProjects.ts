import { useQuery } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
import { useParams } from "react-router-dom";
import { projectKeys } from "../constants/project.keys";
import { notify } from "../../../shared/utils/toast";

export const useProjects = () => {
  const { workspaceId } = useParams();

  return useQuery({
    queryKey: projectKeys.list(workspaceId ?? ""),

    queryFn: () => {
      if (!workspaceId) {
        notify.error("Workspace not found");
        return;
      }

      return projectApi.getProjects(workspaceId);
    },

    enabled: !!workspaceId,
  });
};

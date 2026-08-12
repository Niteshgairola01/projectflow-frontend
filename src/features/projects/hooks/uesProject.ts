import { useQuery } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
import { useParams } from "react-router-dom";

export const useProject = () => {
  const { workspaceId, projectId } = useParams();

  return useQuery({
    queryKey: ["projects", workspaceId, projectId],
    queryFn: () => projectApi.getProjectById(workspaceId, projectId),
    enabled: !!workspaceId && !!projectId,
  });
};

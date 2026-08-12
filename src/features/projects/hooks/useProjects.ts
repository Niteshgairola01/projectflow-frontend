import { useQuery } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
import { useParams } from "react-router-dom";

export const useProjects = () => {
  const { workspaceId } = useParams();

  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => projectApi.getAllProjects(workspaceId),
    enabled: !!workspaceId,
  });
};

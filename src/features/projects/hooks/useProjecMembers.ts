import { useQuery } from "@tanstack/react-query";
import { projectMemberKeys } from "../constants/projectMember..keys";
import { projectMemberApis } from "../api/projectMember.api";
import { useParams } from "react-router-dom";

export const useProjectMembers = () => {
  const { workspaceId, projectId } = useParams();
  return useQuery({
    queryKey: projectMemberKeys.list(workspaceId ?? "", projectId ?? ""),

    queryFn: () => {
      if (!workspaceId) throw new Error("Workspace not found");
      if (!projectId) throw new Error("Project not found");

      return projectMemberApis.getProjectMembers(workspaceId, projectId);
    },

    enabled: !!workspaceId && !!projectId,
  });
};

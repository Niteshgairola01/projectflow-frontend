import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddProjectMemberPayload } from "../types/projectMember.types";
import { projectMemberApis } from "../api/projectMember.api";
import { projectMemberKeys } from "../constants/projectMember..keys";
import { useParams } from "react-router-dom";

export const useAddProjectMember = () => {
  const { workspaceId, projectId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddProjectMemberPayload) =>
      projectMemberApis.addProjectMember(workspaceId, projectId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectMemberKeys.list(workspaceId, projectId),
      });
    },
  });
};

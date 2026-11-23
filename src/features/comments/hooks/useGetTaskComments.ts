import { useQuery } from "@tanstack/react-query";
import { commentApis } from "../api/comment.api";
import { useParams } from "react-router-dom";
import { commentKeys } from "../contants/comment.keys";

export const useGetTaskComments = () => {
  const { workspaceId, projectId, taskId } = useParams();

  return useQuery({
    queryKey: commentKeys.list(
      workspaceId ?? "",
      projectId ?? "",
      taskId ?? "",
    ),

    queryFn: () =>
      commentApis.getAllTaskComments(
        workspaceId ?? "",
        projectId ?? "",
        taskId ?? "",
      ),

    enabled: !!workspaceId && !!projectId && !!taskId,
  });
};

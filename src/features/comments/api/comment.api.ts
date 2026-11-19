import { api } from "../../../shared/services/api/axios";
import type { ApiResponse } from "../../../shared/types/api.types";
import type { AddCommentPayload } from "../schemas/addCommentSchema";
import type { EditCommentPayload } from "../schemas/editCommentSchema";
import type { Comment, CommentResponse } from "../types/comment.types";

const base = "/workspaces";
export const commentApis = {
  addComment: async (
    workspaceId: string,
    projectId: string,
    taskId: string,
    payload: AddCommentPayload,
  ): Promise<Comment> => {
    const response = await api.post<ApiResponse<Comment>>(
      `${base}/${workspaceId}/projects/${projectId}/tasks/${taskId}/comment`,
      payload,
    );

    return response.data.data;
  },

  editComment: async (
    workspaceId: string,
    projectId: string,
    taskId: string,
    commentId: string,
    payload: EditCommentPayload,
  ): Promise<Comment> => {
    const response = await api.patch<ApiResponse<Comment>>(
      `${base}/${workspaceId}/projects/${projectId}/tasks/${taskId}/comment/${commentId}`,
      payload,
    );

    return response.data.data;
  },

  getAllTaskComments: async (
    workspaceId: string,
    projectId: string,
    taskId: string,
  ): Promise<CommentResponse[]> => {
    const response = await api.get<ApiResponse<CommentResponse[]>>(
      `${base}/${workspaceId}/projects/${projectId}/tasks/${taskId}/comment`,
    );

    return response.data.data;
  },

  deleteComment: async (
    workspaceId: string,
    projectId: string,
    taskId: string,
    commentId: string,
  ): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(
      `${base}/${workspaceId}/projects/${projectId}/tasks/${taskId}/comment/${commentId}`,
    );

    return response.data.data;
  },
};

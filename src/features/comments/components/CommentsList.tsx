import { useState, type Dispatch, type SetStateAction } from "react";
import { useGetTaskComments } from "../hooks/useGetTaskComments";
import type { CommentResponse } from "../types/comment.types";
import Comment from "./Comment";

interface CommentListProps {
  setEditingComment: Dispatch<SetStateAction<CommentResponse | null>>;
}

const CommentsList = ({ setEditingComment }: CommentListProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { data: comments = [], isLoading, isError } = useGetTaskComments();

  if (isLoading) {
    return (
      <div>
        <h6 className="mb-2">All Comments</h6>
        <div className="w-full ps-2 text-gray-500">Loading comments...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h6 className="mb-2">All Comments</h6>
        <div className="w-full ps-2 text-gray-500">Unable to load comments</div>
      </div>
    );
  }

  if (comments?.length === 0) {
    return (
      <div>
        <h6 className="mb-2">All Comments</h6>
        <div className="w-full ps-2 text-gray-500">No comment found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex justify-start items-center">
        <h5 className="font-bold">All Comments</h5>

        {comments?.length > 0 && (
          <span className="ms-3 py-1 px-2 bg-muted flex shrink-0 items-center justify-center text-xs font-semibold border border-primary rounded-full">
            {comments.length}
          </span>
        )}
      </div>

      <hr className="mb-4" />

      <ul>
        {comments?.map((comment) => (
          <Comment
            comment={comment}
            setOpenMenuId={setOpenMenuId}
            openMenuId={openMenuId}
            setEditingComment={setEditingComment}
            key={comment._id}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;

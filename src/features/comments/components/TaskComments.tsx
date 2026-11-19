import { useState } from "react";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";
import type { CommentResponse } from "../types/comment.types";
import EditComment from "./EditComment";

const TaskComments = () => {
  const [editingComment, setEditingComment] = useState<CommentResponse | null>(
    null,
  );

  return (
    <div>
      {/* Comments List View */}
      <CommentsList setEditingComment={setEditingComment} />

      {/* Form Section */}
      <div className="mt-5">
        <hr className="mb-2" />
        {editingComment ? (
          <EditComment
            initialData={editingComment}
            setEditingComment={setEditingComment}
            key={editingComment._id}
          />
        ) : (
          <AddComment />
        )}
      </div>
    </div>
  );
};

export default TaskComments;

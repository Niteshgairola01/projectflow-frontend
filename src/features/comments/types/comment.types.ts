export interface Comment {
  _id: string;
  content: string;
  author: string;
  taskId: string;
  parentComment: string | null;
  isEdited: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommentAuthor {
  _id: string;
  name: string;
}

export interface CommentResponse extends Omit<Comment, "author"> {
  author: CommentAuthor;
}

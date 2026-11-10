export interface Comment {
  _id: string;
  content: string;
  author: string;
  taskId: string;
  parentComment: string | null;
  isEdited: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  creatdAt: string;
  updatedAt: string;
}

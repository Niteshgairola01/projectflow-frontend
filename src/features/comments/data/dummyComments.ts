// UI-only data. Replace with the comments API when integrating the feature.
export interface PreviewComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  isOwn?: boolean;
  isEdited?: boolean;
}

export const dummyComments: PreviewComment[] = [
  {
    id: "comment-1",
    author: "Rahul Sharma",
    content: "The first version is ready. Please review the layout and let me know if anything needs updating.",
    createdAt: "2026-11-11T09:00:00+05:30",
    parentId: null,
  },
  {
    id: "comment-2",
    author: "Nitesh Gairola",
    content: "Looks good! Please check the spacing on mobile too.",
    createdAt: "2026-11-11T09:30:00+05:30",
    parentId: "comment-1",
    isOwn: true,
    isEdited: true,
  },
  {
    id: "comment-3",
    author: "Amit Verma",
    content: "Should we include the last updated time below the title? It would help keep everyone in sync.",
    createdAt: "2026-11-11T10:00:00+05:30",
    parentId: null,
  },
  {
    id: "comment-4",
    author: "Nitesh Gairola",
    content: "Yes, let’s include it. I’ll take another look once the changes are ready.",
    createdAt: "2026-11-11T10:15:00+05:30",
    parentId: null,
    isOwn: true,
  },
];

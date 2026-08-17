export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },

  workspace: {
    all: ["workspaces"],
    detail: (id: string) => ["workspce", id],
  },

  projects: {
    all: ["projects"] as const,
    detail: (id: string) => ["detail", id],
  },

  tasks: {
    all: ["tasks"],
    detail: (id: string) => ["task", id],
  },
};

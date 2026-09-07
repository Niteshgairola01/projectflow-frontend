export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },

  workspace: {
    all: ["workspaces"] as const,
    list: (userId: string) => ["workspaces", userId] as const,
    detail: (id: string) => ["workspaces", id] as const,
  },

  projects: {
    all: ["projects"] as const,
    detail: (id: string) => ["detail", id] as const,
  },

  tasks: {
    all: ["tasks"] as const,
    detail: (id: string) => ["task", id] as const,
  },
};

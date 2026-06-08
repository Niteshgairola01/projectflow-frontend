let accessToken: string | null = null;

export const tokenManager = {
  getToken: () => accessToken,

  setToken: (token: string) => {
    accessToken = token;
  },

  clearToken: () => {
    accessToken = null;
  },
};

import { useAppSelector } from "./useAppSelector";

export const useCurrentWorkspace = () => {
  return useAppSelector((state) => state.workspace.currentWorkspace);
};

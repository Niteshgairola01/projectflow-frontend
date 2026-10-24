import { store } from "../../../app/store/store";
import { logout } from "../../../features/auth/store/authSlice";
import { clearCurrentWorkspace } from "../../../features/workspace/store/workspaceSlice";
import { queryClient } from "../api/queryClient";
import { tokenManager } from "./tokenManager";

export const clearSession = () => {
  tokenManager.clearToken();
  // Removing queries also cancels pending queries, preventing old results
  // from repopulating the cache after another account signs in.
  queryClient.clear();
  store.dispatch(clearCurrentWorkspace());
  store.dispatch(logout());
};

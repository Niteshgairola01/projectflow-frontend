import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WorkspaceState } from "./workspace.types";
import type { Workspace } from "../types/workspace.types";

const initialState: WorkspaceState = {
  currentWorkspace: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setCurrentWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.currentWorkspace = action.payload;
    },

    clearCurrentWorkspace: (state) => {
      state.currentWorkspace = null;
    },
  },
});

export const { setCurrentWorkspace, clearCurrentWorkspace } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/store/authSlice";
import workspaceReducer from "../../features/workspace/store/workspaceSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
});

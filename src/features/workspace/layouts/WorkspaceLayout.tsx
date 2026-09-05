import { Outlet, useParams } from "react-router-dom";
import { useWorkspace } from "../hooks/useWorkspace";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useEffect } from "react";
import { setCurrentWorkspace } from "../store/workspaceSlice";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

const WorkspaceLayout = () => {
  const { workspaceId } = useParams();

  const dispatch = useAppDispatch();
  const currentWorkspaceId = useAppSelector(
    (state) => state.workspace.currentWorkspace?._id,
  );

  const { data: workspace, isLoading, isError } = useWorkspace(workspaceId);

  useEffect(() => {
    if (workspace) {
      dispatch(setCurrentWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  if (!workspaceId) {
    return <div>Invalid Workspace</div>;
  }

  if (isLoading) {
    return <AppLoader message="Loading your workspace..."/>;
  }

  if (isError || !workspace) {
    return <div>Workspace not found</div>;
  }

  // Children evaluate permissions from the workspace in Redux. Avoid a brief
  // unauthorized render while the newly fetched workspace is being synced.
  if (currentWorkspaceId !== workspace._id) {
    return <AppLoader message="Loading workspace permissions..." />;
  }

  return <Outlet />;
};

export default WorkspaceLayout;

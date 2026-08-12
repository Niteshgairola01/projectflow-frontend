import { Outlet, useParams } from "react-router-dom";
import { useWorkspace } from "../hooks/useWorkspace";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useEffect } from "react";
import { setCurrentWorkspace } from "../store/workspaceSlice";

const WorkspaceLayout = () => {
  const { workspaceId } = useParams();

  const dispatch = useAppDispatch();

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
    return <AppLoader />;
  }

  if (isError || !workspace) {
    return <div>Workspace not found</div>;
  }

  return <Outlet />;
};

export default WorkspaceLayout;

import { useWorkspace } from "../hooks/useWorkspace";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import WorkspaceDetailsHeader from "../components/WorkspaceDetailsHeader";
import WorkspaceInfoCard from "../components/WorkspaceInfoCard";
import WorkspaceStatsCard from "../components/WorkspaceStatsCard";
import WorkspaceMembersList from "../components/WorkspaceMembersList";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useEffect } from "react";
import {
  clearCurrentWorkspace,
  setCurrentWorkspace,
} from "../store/workspaceSlice";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";

const WorkspaceDetailsPage = () => {
  const { workspaceId } = useParams();
  const { user } = useAppSelector((state) => state.auth);

  const { data: workspace, isLoading } = useWorkspace(workspaceId);

  const dispatch = useAppDispatch();

  // set current workspace to global state
  useEffect(() => {
    if (workspace) {
      dispatch(setCurrentWorkspace(workspace));
    }

    // clear currenr workspace from global state
    return () => {
      dispatch(clearCurrentWorkspace());
    };
  }, [workspace, dispatch]);

  // Invalid workspace
  if (!workspaceId) {
    return <div>Invalid workspace</div>;
  }

  // Loading
  if (isLoading) {
    return <AppLoader />;
  }

  // Workspace not found
  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  const role = workspace.members.find(
    (member) => member.user?._id === user?._id
  )?.role;

  return (
    <div className="space-y-6">
      {/* Header */}

      <WorkspaceDetailsHeader workspace={workspace} />
      {/* Top Section */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Workspace Info */}
        <WorkspaceInfoCard workspace={workspace} role={role} />

        {/* Stats */}
        <WorkspaceStatsCard workspace={workspace} />
      </div>

      {/* Members */}
      <WorkspaceMembersList workspace={workspace} />
    </div>
  );
};

export default WorkspaceDetailsPage;

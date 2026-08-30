import WorkspaceInvitationListHeader from "../components/WorkspaceInvitationPageHeader";
import WorkspaceInvitationPageSummarySection from "../components/WorkspaceInvitationPageSummarySection";
import WorkspaceInvitationList from "../components/WorkspaceInvitationList";
import { useGetInvitations } from "../../invitation/hooks/useGetInvitations";

const WorkspacePendingInvitationsPage = () => {
  const { data, isLoading, isError } = useGetInvitations();

  // UI data only.
  // Replace this with API data later.

  return (
    <div className="space-y-6">
      {/* Header */}
      <WorkspaceInvitationListHeader />

      {/* Summary */}
      <WorkspaceInvitationPageSummarySection invitations={data} />

      {/* Invitation Table Card */}
      <WorkspaceInvitationList
        invitations={data}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default WorkspacePendingInvitationsPage;

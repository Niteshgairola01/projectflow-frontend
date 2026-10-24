import { AlertCircle } from "lucide-react";
import { focus } from "../constants/dashboardStyles";


interface Props {
  onRetry: () => void;
}

const DashboardError = ({ onRetry }: Props) => (
  <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
    <AlertCircle size={18} />
    <span className="flex-1">Some data could not be loaded. Summaries may be incomplete.</span>
    <button type="button" className={`font-semibold underline ${focus}`} onClick={onRetry}>Try again</button>
  </div>
);

export default DashboardError;

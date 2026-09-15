const STATUS_COLORS = {
  Submitted: "badge-submitted",
  "Under Review": "badge-review",
  Assigned: "badge-assigned",
  "In Progress": "badge-progress",
  Resolved: "badge-resolved",
  Verified: "badge-verified",
};

export default function StatusBadge({ status }) {
  const colorClass = STATUS_COLORS[status] || "badge-submitted";
  return <span className={`cp-status-badge ${colorClass}`}>{status}</span>;
}

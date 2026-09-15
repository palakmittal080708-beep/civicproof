import { useEffect, useState } from "react";
import { Plus, FileText, Clock, CheckCircle2, ShieldCheck } from "lucide-react";
import Button from "../components/Button";
import ComplaintCard from "../components/ComplaintCard";
import { mockComplaints } from "../data/mockComplaints";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("civicproof_complaints") || "[]");
    setComplaints([...mockComplaints, ...local]);
  }, []);

  const total = complaints.length;
  const inProgress = complaints.filter((c) =>
    ["Under Review", "Assigned", "In Progress"].includes(c.status)
  ).length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const verified = complaints.filter((c) => c.status === "Verified").length;

  const summary = [
    { label: "Total Complaints", value: total, icon: FileText, color: "cp-summary-blue" },
    { label: "In Progress", value: inProgress, icon: Clock, color: "cp-summary-amber" },
    { label: "Resolved", value: resolved, icon: CheckCircle2, color: "cp-summary-green" },
    { label: "Verified", value: verified, icon: ShieldCheck, color: "cp-summary-purple" },
  ];

  return (
    <div className="cp-page">
      <div className="cp-page-header cp-dashboard-header">
        <div>
          <h1>My Civic Dashboard</h1>
          <p>Track all your civic complaints in one place.</p>
        </div>
        <Button to="/report">
          <Plus size={16} /> Report New Issue
        </Button>
      </div>

      <div className="cp-summary-grid">
        {summary.map((s) => (
          <div key={s.label} className={`cp-summary-card ${s.color}`}>
            <div className="cp-summary-icon">
              <s.icon size={22} />
            </div>
            <div>
              <span className="cp-summary-value">{s.value}</span>
              <span className="cp-summary-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="cp-dashboard-list">
        <h2>My Complaints</h2>
        <div className="cp-complaint-grid">
          {complaints.map((c) => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

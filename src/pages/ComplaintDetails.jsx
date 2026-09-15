import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Tag,
  FileText,
  Clock,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import StatusTimeline from "../components/StatusTimeline";
import { mockComplaints } from "../data/mockComplaints";

export default function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const found =
      mockComplaints.find((c) => c.id.toLowerCase() === id.toLowerCase()) ||
      JSON.parse(localStorage.getItem("civicproof_complaints") || "[]").find(
        (c) => c.id.toLowerCase() === id.toLowerCase()
      );
    setComplaint(found || null);
    setLoaded(true);
  }, [id]);

  const handleVerify = () => {
    setVerifying(true);
    setVerifyMsg("Resolution marked for verification.");
  };

  if (!loaded) return null;

  if (!complaint) {
    return (
      <div className="cp-page">
        <div className="cp-page-header">
          <h1>Complaint Not Found</h1>
          <p>No complaint found with ID "{id}".</p>
        </div>
        <Button to="/track">Back to Track</Button>
      </div>
    );
  }

  return (
    <div className="cp-page">
      <Link to="/track" className="cp-back-link">
        <ArrowLeft size={16} /> Back to Track
      </Link>

      <div className="cp-details-header">
        <div>
          <span className="cp-details-id">{complaint.id}</span>
          <h1>{complaint.title}</h1>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div className="cp-details-grid">
        {/* Left: Info */}
        <div className="cp-details-info">
          <div className="cp-info-card">
            <h2>Complaint Information</h2>
            <div className="cp-info-list">
              <div className="cp-info-item">
                <Tag size={16} />
                <div>
                  <span className="cp-info-label">Category</span>
                  <span className="cp-info-value">{complaint.category}</span>
                </div>
              </div>
              <div className="cp-info-item">
                <FileText size={16} />
                <div>
                  <span className="cp-info-label">Description</span>
                  <span className="cp-info-value">{complaint.description}</span>
                </div>
              </div>
              <div className="cp-info-item">
                <MapPin size={16} />
                <div>
                  <span className="cp-info-label">Location</span>
                  <span className="cp-info-value">
                    {complaint.location}
                    {complaint.landmark ? ` — ${complaint.landmark}` : ""}
                  </span>
                </div>
              </div>
              <div className="cp-info-item">
                <Calendar size={16} />
                <div>
                  <span className="cp-info-label">Submitted</span>
                  <span className="cp-info-value">{complaint.submittedDate}</span>
                </div>
              </div>
              <div className="cp-info-item">
                <Clock size={16} />
                <div>
                  <span className="cp-info-label">Last Updated</span>
                  <span className="cp-info-value">{complaint.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {complaint.image && (
            <div className="cp-info-card">
              <h2>Evidence</h2>
              <img src={complaint.image} alt="Evidence" className="cp-evidence-img" />
            </div>
          )}
        </div>

        {/* Right: Timeline + Activity */}
        <div className="cp-details-side">
          <div className="cp-info-card">
            <h2>Status Timeline</h2>
            <StatusTimeline currentStatus={complaint.status} />
          </div>

          <div className="cp-info-card">
            <h2>Complaint Activity</h2>
            <div className="cp-activity-list">
              {complaint.activity.map((a, i) => (
                <div key={i} className="cp-activity-item">
                  <div className="cp-activity-dot" />
                  <div className="cp-activity-body">
                    <span className="cp-activity-date">{a.date}</span>
                    <span className="cp-activity-text">{a.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cp-info-card cp-verify-card">
            <h2>Resolution Verification</h2>
            {verifyMsg ? (
              <div className="cp-verify-confirmed">
                <CheckCircle2 size={24} />
                <p>{verifyMsg}</p>
              </div>
            ) : (
              <>
                <p className="cp-verify-status">
                  <ShieldCheck size={18} /> Pending verification
                </p>
                <Button onClick={handleVerify} disabled={verifying}>
                  Verify Resolution
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

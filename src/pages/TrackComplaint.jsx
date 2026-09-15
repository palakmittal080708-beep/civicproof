import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, Clock, ArrowRight, AlertCircle } from "lucide-react";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import StatusTimeline from "../components/StatusTimeline";
import { mockComplaints } from "../data/mockComplaints";

export default function TrackComplaint() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    const found =
      mockComplaints.find(
        (c) => c.id.toLowerCase() === query.trim().toLowerCase()
      ) ||
      JSON.parse(localStorage.getItem("civicproof_complaints") || "[]").find(
        (c) => c.id.toLowerCase() === query.trim().toLowerCase()
      );
    setResult(found || null);
  };

  return (
    <div className="cp-page">
      <div className="cp-page-header">
        <h1>Track Your Complaint</h1>
        <p>Enter your Complaint ID to check the latest status.</p>
      </div>

      <form className="cp-track-form" onSubmit={handleSearch}>
        <div className="cp-track-input-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Complaint ID (e.g. CP-10245)"
          />
          <Button type="submit">
            <Search size={16} /> Track Complaint
          </Button>
        </div>
        <small className="cp-track-hint">
          Try the demo ID:{" "}
          <button type="button" className="cp-demo-id" onClick={() => setQuery("CP-10245")}>
            CP-10245
          </button>
        </small>
      </form>

      {searched && !result && (
        <div className="cp-track-notfound">
          <AlertCircle size={28} />
          <p>No complaint found with ID "{query}". Try CP-10245.</p>
        </div>
      )}

      {result && (
        <div className="cp-track-result">
          <div className="cp-track-result-card">
            <div className="cp-track-result-header">
              <div>
                <span className="cp-track-id">{result.id}</span>
                <h2>{result.title}</h2>
              </div>
              <StatusBadge status={result.status} />
            </div>

            <div className="cp-track-info-grid">
              <div className="cp-track-info">
                <span className="cp-track-info-key">Issue</span>
                <span className="cp-track-info-val">{result.category}</span>
              </div>
              <div className="cp-track-info">
                <span className="cp-track-info-key">Location</span>
                <span className="cp-track-info-val">
                  <MapPin size={14} /> {result.location}
                </span>
              </div>
              <div className="cp-track-info">
                <span className="cp-track-info-key">Submitted</span>
                <span className="cp-track-info-val">
                  <Calendar size={14} /> {result.submittedDate}
                </span>
              </div>
              <div className="cp-track-info">
                <span className="cp-track-info-key">Current Status</span>
                <span className="cp-track-info-val">{result.status}</span>
              </div>
            </div>

            <div className="cp-track-timeline-section">
              <h3>Status Timeline</h3>
              <StatusTimeline currentStatus={result.status} />
            </div>

            <div className="cp-track-updated">
              <Clock size={14} /> Last Updated: {result.lastUpdated}
            </div>

            <Link to={`/complaint/${result.id}`} className="cp-track-details-link">
              View Full Details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

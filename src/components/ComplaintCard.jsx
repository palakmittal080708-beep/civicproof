import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ComplaintCard({ complaint }) {
  return (
    <div className="cp-complaint-card">
      <div className="cp-complaint-card-top">
        <span className="cp-complaint-id">{complaint.id}</span>
        <StatusBadge status={complaint.status} />
      </div>
      <h3 className="cp-complaint-title">{complaint.title}</h3>
      <div className="cp-complaint-meta">
        <span className="cp-complaint-category">{complaint.category}</span>
        <span className="cp-complaint-location">
          <MapPin size={14} /> {complaint.location}
        </span>
      </div>
      <Link
        to={`/complaint/${complaint.id}`}
        className="cp-complaint-view"
      >
        View Details <ChevronRight size={16} />
      </Link>
    </div>
  );
}

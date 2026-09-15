import { Check } from "lucide-react";
import { STATUS_STAGES } from "../data/mockComplaints";

export default function StatusTimeline({ currentStatus }) {
  const currentIndex = STATUS_STAGES.indexOf(currentStatus);

  return (
    <div className="cp-timeline">
      {STATUS_STAGES.map((stage, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isPending = i > currentIndex;

        return (
          <div key={stage} className="cp-timeline-item">
            <div
              className={`cp-timeline-dot ${
                isComplete
                  ? "cp-dot-complete"
                  : isCurrent
                  ? "cp-dot-current"
                  : "cp-dot-pending"
              }`}
            >
              {isComplete ? <Check size={14} /> : isCurrent ? "" : ""}
            </div>
            <div className="cp-timeline-content">
              <span
                className={`cp-timeline-label ${
                  isPending ? "cp-timeline-label-pending" : ""
                }`}
              >
                {stage}
              </span>
            </div>
            {i < STATUS_STAGES.length - 1 && (
              <div
                className={`cp-timeline-line ${
                  i < currentIndex ? "cp-line-complete" : "cp-line-pending"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

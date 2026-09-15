import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Eye,
  Send,
  Wrench,
  ClipboardCheck,
} from "lucide-react";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import StatusTimeline from "../components/StatusTimeline";

const features = [
  {
    icon: FileText,
    title: "Report",
    text: "Report civic problems with important details and evidence.",
  },
  {
    icon: Search,
    title: "Track",
    text: "Track your complaint from submission to resolution.",
  },
  {
    icon: ShieldCheck,
    title: "Verify",
    text: "Verify whether a reported issue has actually been resolved.",
  },
];

const steps = [
  { icon: Send, title: "Report", text: "Citizen submits a civic complaint with details and evidence." },
  { icon: Eye, title: "Review", text: "Authorities review and assign the complaint to the right department." },
  { icon: Wrench, title: "Resolve", text: "The assigned department works on fixing the reported issue." },
  { icon: ClipboardCheck, title: "Verify", text: "Citizen verifies that the issue has actually been resolved." },
];

export default function Home() {
  return (
    <div className="cp-home">
      {/* Hero */}
      <section className="cp-hero">
        <div className="cp-hero-left">
          <span className="cp-hero-label">SMART CIVIC REPORTING</span>
          <h1 className="cp-hero-heading">
            Report It.
            <br />
            Track It.
            <br />
            Verify It.
          </h1>
          <p className="cp-hero-text">
            Report civic issues, track their progress and verify their resolution — all in one transparent platform.
          </p>
          <div className="cp-hero-buttons">
            <Button to="/report">Report an Issue</Button>
            <Button to="/track" variant="secondary">Track Complaint</Button>
          </div>
        </div>

        <div className="cp-hero-right">
          <div className="cp-hero-card">
            <div className="cp-hero-card-top">
              <ShieldCheck size={28} className="cp-hero-card-icon" />
              <span className="cp-hero-card-label">Complaint Verified</span>
            </div>
            <p className="cp-hero-card-text">Your civic issue is being tracked.</p>
            <div className="cp-hero-card-row">
              <span className="cp-hero-card-key">Complaint ID</span>
              <span className="cp-hero-card-val">CP-10245</span>
            </div>
            <div className="cp-hero-card-row">
              <span className="cp-hero-card-key">Status</span>
              <StatusBadge status="In Progress" />
            </div>
            <div className="cp-hero-card-timeline">
              <StatusTimeline currentStatus="In Progress" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="cp-section">
        <div className="cp-features">
          {features.map((f) => (
            <div key={f.title} className="cp-feature-card">
              <div className="cp-feature-icon">
                <f.icon size={26} />
              </div>
              <h3 className="cp-feature-title">{f.title}</h3>
              <p className="cp-feature-text">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="cp-section cp-how">
        <h2 className="cp-section-title">How CivicProof Works</h2>
        <div className="cp-steps">
          {steps.map((s, i) => (
            <div key={s.title} className="cp-step">
              <div className="cp-step-number">{i + 1}</div>
              <div className="cp-step-icon">
                <s.icon size={24} />
              </div>
              <h3 className="cp-step-title">{s.title}</h3>
              <p className="cp-step-text">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cp-section">
        <div className="cp-cta">
          <div>
            <h2 className="cp-cta-title">Have a civic issue?</h2>
            <p className="cp-cta-text">Report it now and track it until it's resolved.</p>
          </div>
          <Button to="/report">
            Report an Issue <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    </div>
  );
}

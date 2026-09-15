import { Eye, GitBranch, ShieldCheck, Target, Lightbulb } from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Transparency",
    text: "Every complaint is visible and trackable from start to finish.",
  },
  {
    icon: GitBranch,
    title: "Trackability",
    text: "Follow your complaint through each stage until it is resolved.",
  },
  {
    icon: ShieldCheck,
    title: "Verification",
    text: "Citizens confirm that reported issues are truly resolved.",
  },
];

export default function About() {
  return (
    <div className="cp-page cp-about">
      <div className="cp-page-header">
        <h1>About CivicProof</h1>
        <p>
          CivicProof is a civic-tech platform designed to make complaint reporting more transparent and accountable.
        </p>
      </div>

      <div className="cp-about-section">
        <div className="cp-about-block">
          <div className="cp-about-icon"><Target size={24} /></div>
          <div>
            <h2>The Problem</h2>
            <p>
              Citizens often report civic issues but have limited visibility into what happens after submission. There is no easy way to know if a complaint is being reviewed, assigned, or resolved.
            </p>
          </div>
        </div>

        <div className="cp-about-block">
          <div className="cp-about-icon"><Lightbulb size={24} /></div>
          <div>
            <h2>The Solution</h2>
            <p>
              CivicProof provides a structured way to report, track and verify civic complaints. Each complaint gets a unique ID and moves through clear stages — from submission to verification.
            </p>
          </div>
        </div>
      </div>

      <div className="cp-about-principles">
        <h2>Our Principles</h2>
        <div className="cp-principles-grid">
          {principles.map((p) => (
            <div key={p.title} className="cp-principle-card">
              <div className="cp-principle-icon">
                <p.icon size={26} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

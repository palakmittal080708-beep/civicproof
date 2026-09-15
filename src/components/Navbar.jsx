import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/report", label: "Report Issue" },
  { to: "/track", label: "Track Complaint" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `cp-nav-link${isActive ? " cp-nav-link-active" : ""}`;

  return (
    <header className="cp-navbar">
      <div className="cp-navbar-inner">
        <Link to="/" className="cp-brand" onClick={() => setOpen(false)}>
          <ShieldCheck size={24} className="cp-brand-icon" />
          <span className="cp-brand-name">CivicProof</span>
        </Link>

        <nav className="cp-nav-desktop">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="cp-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="cp-nav-mobile">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={linkClass}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  CheckCircle2,
  Home as HomeIcon,
  Search,
  Image as ImageIcon,
  X,
} from "lucide-react";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import { CATEGORY_OPTIONS } from "../data/mockComplaints";

export default function ReportIssue() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    landmark: "",
    dateTime: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `CP-${10246 + Math.floor(Math.random() * 900)}`;
    const now = new Date();
    const newComplaint = {
      id: newId,
      category: form.category || "Other",
      title: form.title,
      description: form.description,
      location: form.location,
      landmark: form.landmark,
      status: "Submitted",
      submittedDate: now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      lastUpdated: now.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      image: imagePreview,
      activity: [
        {
          date: now.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
          text: "Complaint submitted",
        },
      ],
    };

    const existing = JSON.parse(localStorage.getItem("civicproof_complaints") || "[]");
    existing.push(newComplaint);
    localStorage.setItem("civicproof_complaints", JSON.stringify(existing));

    setSubmitted(newComplaint);
  };

  if (submitted) {
    return (
      <div className="cp-page cp-report-success">
        <div className="cp-success-card">
          <div className="cp-success-icon">
            <CheckCircle2 size={64} />
          </div>
          <h2>Complaint Submitted Successfully!</h2>
          <p>Your complaint has been registered.</p>
          <div className="cp-success-info">
            <div className="cp-success-row">
              <span>Complaint ID</span>
              <strong>{submitted.id}</strong>
            </div>
            <div className="cp-success-row">
              <span>Status</span>
              <StatusBadge status="Submitted" />
            </div>
          </div>
          <div className="cp-success-buttons">
            <Button to={`/complaint/${submitted.id}`}>
              <Search size={16} /> Track Complaint
            </Button>
            <Button to="/" variant="secondary">
              <HomeIcon size={16} /> Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-page">
      <div className="cp-page-header">
        <h1>Report a Civic Issue</h1>
        <p>Help improve your community by reporting a civic problem.</p>
      </div>

      <form className="cp-form" onSubmit={handleSubmit}>
        <div className="cp-form-grid">
          <div className="cp-field">
            <label>Issue Category</label>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="" disabled>Select a category</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="cp-field">
            <label>Issue Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Pothole on Main Road"
              required
            />
          </div>

          <div className="cp-field cp-field-full">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue in detail..."
              rows={4}
              required
            />
          </div>

          <div className="cp-field">
            <label>Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Sector 21"
              required
            />
          </div>

          <div className="cp-field">
            <label>Landmark / Additional Location Details</label>
            <input
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              placeholder="e.g. Near Central Park"
            />
          </div>

          <div className="cp-field cp-field-full">
            <label>Upload Evidence (optional)</label>
            <div className="cp-upload-area" onClick={() => fileInputRef.current?.click()}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                style={{ display: "none" }}
              />
              {imagePreview ? (
                <div className="cp-upload-preview">
                  <img src={imagePreview} alt="Preview" />
                  <div className="cp-upload-info">
                    <span><ImageIcon size={16} /> {fileName}</span>
                    <button type="button" className="cp-upload-remove" onClick={(e) => { e.stopPropagation(); removeImage(); }}>
                      <X size={16} /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="cp-upload-placeholder">
                  <Upload size={28} />
                  <span>Click to upload an image</span>
                  <small>PNG, JPG up to 5MB</small>
                </div>
              )}
            </div>
          </div>

          <div className="cp-field">
            <label>Date and Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={form.dateTime}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="cp-form-actions">
          <Button type="submit">Submit Complaint</Button>
        </div>
      </form>
    </div>
  );
}

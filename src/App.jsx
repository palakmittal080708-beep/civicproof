import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import TrackComplaint from "./pages/TrackComplaint";
import ComplaintDetails from "./pages/ComplaintDetails";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="cp-app">
        <Navbar />
        <main className="cp-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/complaint/:id" element={<ComplaintDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="cp-footer">
          <p>CivicProof — Report It. Track It. Verify It.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

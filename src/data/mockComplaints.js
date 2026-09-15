export const STATUS_STAGES = [
  "Submitted",
  "Under Review",
  "Assigned",
  "In Progress",
  "Resolved",
  "Verified",
];

export const CATEGORY_OPTIONS = [
  "Pothole",
  "Broken Streetlight",
  "Garbage",
  "Water Leakage",
  "Road Damage",
  "Drainage",
  "Other",
];

export const mockComplaints = [
  {
    id: "CP-10245",
    category: "Broken Streetlight",
    title: "Streetlight not working near park entrance",
    description:
      "The streetlight at the entrance of Sector 21 park has been non-functional for over a week, making the area unsafe at night.",
    location: "Sector 21",
    landmark: "Near Central Park Gate",
    status: "In Progress",
    submittedDate: "12 September 2026",
    lastUpdated: "12 September 2026, 10:30 AM",
    image: null,
    activity: [
      { date: "12 Sep", text: "Complaint submitted" },
      { date: "12 Sep", text: "Complaint reviewed by authority" },
      { date: "13 Sep", text: "Complaint assigned to department" },
      { date: "14 Sep", text: "Work started" },
    ],
  },
  {
    id: "CP-10230",
    category: "Garbage",
    title: "Garbage accumulation near school",
    description:
      "Large piles of uncollected garbage have accumulated near the school in Sector 18, causing hygiene concerns for students and residents.",
    location: "Sector 18",
    landmark: "Opposite Green Valley School",
    status: "Verified",
    submittedDate: "2 September 2026",
    lastUpdated: "10 September 2026, 4:00 PM",
    image: null,
    activity: [
      { date: "2 Sep", text: "Complaint submitted" },
      { date: "3 Sep", text: "Complaint reviewed by authority" },
      { date: "4 Sep", text: "Complaint assigned to sanitation department" },
      { date: "6 Sep", text: "Garbage clearance started" },
      { date: "9 Sep", text: "Issue resolved" },
      { date: "10 Sep", text: "Resolution verified by citizen" },
    ],
  },
];

export function findComplaintById(id) {
  return mockComplaints.find(
    (c) => c.id.toLowerCase() === id.trim().toLowerCase()
  );
}

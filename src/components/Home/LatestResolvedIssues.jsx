import React from "react";
import IssueCard from "./IssueCard ";
// adjust path as needed

const dummyIssues = [
  {
    id: 1,
    title: "Streetlight Fixed",
    category: "Streetlight",
    status: "Resolved",
    priority: "Normal",
    location: "Khulna City",
    image: "https://via.placeholder.com/300x200?text=Streetlight",
    upvotes: 10,
  },
  {
    id: 2,
    title: "Pothole Repaired",
    category: "Road",
    status: "Resolved",
    priority: "High",
    location: "Dhaka",
    image: "https://via.placeholder.com/300x200?text=Pothole",
    upvotes: 25,
  },
  {
    id: 3,
    title: "Water Leakage Fixed",
    category: "Water",
    status: "Resolved",
    priority: "Normal",
    location: "Chattogram",
    image: "https://via.placeholder.com/300x200?text=Leakage",
    upvotes: 15,
  },
  {
    id: 4,
    title: "Garbage Cleaned",
    category: "Waste",
    status: "Resolved",
    priority: "Normal",
    location: "Sylhet",
    image: "https://via.placeholder.com/300x200?text=Garbage",
    upvotes: 12,
  },
  {
    id: 5,
    title: "Footpath Repaired",
    category: "Footpath",
    status: "Resolved",
    priority: "High",
    location: "Rajshahi",
    image: "https://via.placeholder.com/300x200?text=Footpath",
    upvotes: 20,
  },
  {
    id: 6,
    title: "Park Lights Installed",
    category: "Park",
    status: "Resolved",
    priority: "Normal",
    location: "Barisal",
    image: "https://via.placeholder.com/300x200?text=Park",
    upvotes: 18,
  },
];

const LatestResolvedIssues = () => {
  const resolvedIssues = dummyIssues
    .filter((issue) => issue.status === "Resolved")
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-bold mb-6 text-green-700">
        Latest Resolved Issues
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resolvedIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default LatestResolvedIssues;

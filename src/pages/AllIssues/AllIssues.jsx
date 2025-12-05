import React from "react";
import Container from "../../components/Shared/Container";
import IssueCard from "../../components/Home/IssueCard ";


const dummyIssues = [
  {
    id: 1,
    title: "Broken Streetlight",
    category: "Streetlight",
    status: "Pending",
    priority: "Normal",
    location: "Khulna City",
    image: "https://via.placeholder.com/300x200?text=Streetlight",
    upvotes: 5,
  },
  {
    id: 2,
    title: "Pothole on Main Road",
    category: "Road",
    status: "In-Progress",
    priority: "High",
    location: "Dhaka",
    image: "https://via.placeholder.com/300x200?text=Pothole",
    upvotes: 12,
  },
  {
    id: 3,
    title: "Garbage Overflow",
    category: "Waste",
    status: "Resolved",
    priority: "Normal",
    location: "Chattogram",
    image: "https://via.placeholder.com/300x200?text=Garbage",
    upvotes: 8,
  },
];

const AllIssues = () => {
  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Issues</h1>

        {/* Issue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllIssues;
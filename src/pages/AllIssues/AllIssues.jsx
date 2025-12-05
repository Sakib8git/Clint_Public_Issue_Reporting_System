import React from "react";
import { Link } from "react-router";
import Container from "../../components/Shared/Container";

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
            <div
              key={issue.id}
              className="border rounded-lg shadow-md overflow-hidden bg-white"
            >
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{issue.title}</h2>
                <p className="text-sm text-gray-600">
                  Category: {issue.category}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span className="font-bold text-blue-600">
                    {issue.status}
                  </span>
                </p>
                <p className="text-sm">
                  Priority:{" "}
                  <span
                    className={
                      issue.priority === "High"
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    {issue.priority}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Location: {issue.location}
                </p>

                {/* Upvote + View Details */}
                <div className="flex justify-between items-center mt-4">
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                    👍 Upvote ({issue.upvotes})
                  </button>
                  <Link
                    to={`/issue/${issue.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllIssues;

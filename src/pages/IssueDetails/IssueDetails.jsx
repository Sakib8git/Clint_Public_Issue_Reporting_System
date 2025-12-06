import React from "react";
import { useParams } from "react-router";
import { FaEdit, FaTrash, FaBolt } from "react-icons/fa";
import Container from "../../components/Shared/Container";

// Dummy issue data
const dummyIssue = {
  id: 1,
  title: "Broken Streetlight",
  category: "Streetlight",
  status: "Pending",
  priority: "Normal",
  location: "Khulna City",
  description:
    "Streetlight near the main bazar is broken and needs urgent fixing.",
  image: "https://via.placeholder.com/600x300?text=Streetlight",
  submittedBy: "citizen123", // logged-in user id
  boosted: false,
  staff: {
    name: "John Doe",
    role: "Electrician",
    contact: "john.doe@city.gov",
  },
  timeline: [
    {
      id: 1,
      status: "Pending",
      message: "Issue reported by citizen",
      updatedBy: "Citizen",
      date: "2025-12-05 10:30 AM",
    },
    {
      id: 2,
      status: "In-Progress",
      message: "Issue assigned to Staff: John Doe",
      updatedBy: "Admin",
      date: "2025-12-05 11:00 AM",
    },
    {
      id: 3,
      status: "Resolved",
      message: "Work completed successfully",
      updatedBy: "Staff",
      date: "2025-12-06 09:00 AM",
    },
  ],
};

// Dummy logged-in user
const loggedInUser = {
  id: "citizen123",
  name: "Nazmus Sakib",
};

const IssueDetails = () => {
  const { id } = useParams();

  const issue = dummyIssue; // later fetch by id

  const canEdit =
    issue.submittedBy === loggedInUser.id && issue.status === "Pending";
  const canDelete = issue.submittedBy === loggedInUser.id;
  const canBoost = !issue.boosted;

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        {/* Issue Header */}
        <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Issue Info */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <p>
            <span className="font-semibold">Category:</span> {issue.category}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className="px-2 py-1 rounded text-white text-sm 
            {issue.status === 'Pending' ? 'bg-yellow-500' : 
             issue.status === 'In-Progress' ? 'bg-blue-500' : 
             issue.status === 'Resolved' ? 'bg-green-500' : 'bg-gray-500'}"
            >
              {issue.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Priority:</span> {issue.priority}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {issue.location}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {issue.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          {canEdit && (
            <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              <FaEdit /> Edit
            </button>
          )}
          {canDelete && (
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              <FaTrash /> Delete
            </button>
          )}
          {canBoost && (
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              <FaBolt /> Boost Priority (100৳)
            </button>
          )}
        </div>

        {/* Staff Info */}
        {issue.staff && (
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-2">Assigned Staff</h2>
            <p>
              <span className="font-semibold">Name:</span> {issue.staff.name}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {issue.staff.role}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {issue.staff.contact}
            </p>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Issue Timeline</h2>
          <div className="space-y-4">
            {issue.timeline.map((entry) => (
              <div key={entry.id} className="border-l-4 pl-4 relative">
                <span className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-lime-500"></span>
                <p className="text-sm text-gray-600">{entry.date}</p>
                <p className="font-semibold">
                  <span
                    className="px-2 py-1 rounded text-white text-xs 
                  {entry.status === 'Pending' ? 'bg-yellow-500' : 
                   entry.status === 'In-Progress' ? 'bg-blue-500' : 
                   entry.status === 'Resolved' ? 'bg-green-500' : 'bg-gray-500'}"
                  >
                    {entry.status}
                  </span>
                </p>
                <p>{entry.message}</p>
                <p className="text-xs text-gray-500">
                  Updated by: {entry.updatedBy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default IssueDetails;

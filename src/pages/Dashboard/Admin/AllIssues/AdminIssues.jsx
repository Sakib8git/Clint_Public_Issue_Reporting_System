import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const dummyIssues = [
  {
    id: "ISSUE001",
    title: "Streetlight not working",
    category: "Streetlight",
    status: "pending",
    priority: "high",
    boosted: true,
    assignedStaff: null,
  },
  {
    id: "ISSUE002",
    title: "Garbage overflow",
    category: "Garbage",
    status: "pending",
    priority: "normal",
    boosted: false,
    assignedStaff: "Staff A",
  },
  {
    id: "ISSUE003",
    title: "Water leakage",
    category: "Water",
    status: "resolved",
    priority: "normal",
    boosted: false,
    assignedStaff: "Staff B",
  },
];

const dummyStaff = ["Staff A", "Staff B", "Staff C"];

const AdminIssues = () => {
  const [issues, setIssues] = useState(dummyIssues);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  const handleAssignStaff = (issueId) => {
    const updated = issues.map((issue) =>
      issue.id === issueId ? { ...issue, assignedStaff: selectedStaff } : issue
    );
    setIssues(updated);
    toast.success(`Assigned ${selectedStaff} to ${issueId}`);
    setSelectedIssue(null);
    setSelectedStaff("");
    console.log(`Tracking record added for ${issueId}: assigned ${selectedStaff}`);
  };

  const handleRejectIssue = (issueId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = issues.map((issue) =>
          issue.id === issueId ? { ...issue, status: "rejected" } : issue
        );
        setIssues(updated);

        Swal.fire({
          title: "Rejected!",
          text: `Issue ${issueId} has been rejected.`,
          icon: "success"
        });

        toast.error(`Issue ${issueId} rejected`);
        console.log(`Tracking record added for ${issueId}: rejected`);
      }
    });
  };

  const sortedIssues = [...issues].sort(
    (a, b) => (b.boosted ? 1 : 0) - (a.boosted ? 1 : 0)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Issues</h1>

      {/* Table */}
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Status</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Assigned Staff</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedIssues.map((issue) => (
            <tr
              key={issue.id}
              className={issue.boosted ? "bg-yellow-50 font-semibold" : ""}
            >
              <td className="p-2">{issue.title}</td>
              <td className="p-2">{issue.category}</td>
              <td className="p-2 capitalize">{issue.status}</td>
              <td className="p-2 capitalize">{issue.priority}</td>
              <td className="p-2">
                {issue.assignedStaff ? issue.assignedStaff : "Not Assigned"}
              </td>
              <td className="p-2 flex gap-2">
                {!issue.assignedStaff && (
                  <button
                    onClick={() => setSelectedIssue(issue.id)}
                    className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-700"
                  >
                    Assign Staff
                  </button>
                )}
                {issue.status === "pending" && (
                  <button
                    onClick={() => handleRejectIssue(issue.id)}
                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-700"
                  >
                    Reject Issue
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Assign Staff */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Assign Staff</h2>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="border px-3 py-2 rounded w-full mb-4"
            >
              <option value="">Select Staff</option>
              {dummyStaff.map((staff) => (
                <option key={staff} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedIssue(null)}
                className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAssignStaff(selectedIssue)}
                disabled={!selectedStaff}
                className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminIssues;
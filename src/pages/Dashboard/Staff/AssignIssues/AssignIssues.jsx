import React, { useState } from "react";
import toast from "react-hot-toast";

const dummyIssues = [
  {
    id: "ISSUE001",
    title: "Streetlight not working",
    status: "pending",
    priority: "high",
    boosted: true,
  },
  {
    id: "ISSUE002",
    title: "Garbage overflow",
    status: "in-progress",
    priority: "medium",
    boosted: false,
  },
  {
    id: "ISSUE003",
    title: "Water leakage",
    status: "working",
    priority: "low",
    boosted: false,
  },
];

const statusFlow = {
  pending: "in-progress",
  "in-progress": "working",
  working: "resolved",
  resolved: "closed",
};

const statusOptions = ["in-progress", "working", "resolved", "closed"];

const AssignedIssues = () => {
  const [issues, setIssues] = useState(dummyIssues);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const handleStatusChange = (id, newStatus) => {
    const updated = issues.map((issue) =>
      issue.id === id ? { ...issue, status: newStatus } : issue
    );
    setIssues(updated);
    toast.success(`Status updated to "${newStatus}"`);
    console.log(`Tracking record added for ${id}: ${newStatus}`);
  };

  const filteredIssues = issues
    .filter((issue) =>
      filterStatus ? issue.status === filterStatus : true
    )
    .filter((issue) =>
      filterPriority ? issue.priority === filterPriority : true
    )
    .sort((a, b) => (b.boosted ? 1 : 0) - (a.boosted ? 1 : 0)); // Boosted first

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assigned Issues</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="working">Working</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full  text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map((issue) => (
            <tr
              key={issue.id}
              className={issue.boosted ? "bg-yellow-50 font-semibold" : ""}
            >
              <td className="p-2">{issue.id}</td>
              <td className="p-2">{issue.title}</td>
              <td className="p-2 capitalize">{issue.status}</td>
              <td className="p-2 capitalize">{issue.priority}</td>
              <td className="p-2">
                <select
                  value={issue.status}
                  onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value={issue.status}>{issue.status}</option>
                  {statusOptions
                    .filter((s) => statusFlow[issue.status] === s)
                    .map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedIssues;
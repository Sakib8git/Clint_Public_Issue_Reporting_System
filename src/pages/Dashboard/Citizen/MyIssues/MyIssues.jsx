import React, { useState } from "react";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";


import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";

const MyIssues = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const axiosSecure = useAxiosSecure();

  // ✅ Fetch issues from backend
  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/dashboard/my-issues`
      );
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load issues</p>;

  // ✅ Filtered issues
  const filteredIssues = issues.filter(
    (issue) =>
      (filterStatus ? issue.status === filterStatus : true) &&
      (filterCategory ? issue.category === filterCategory : true)
  );

  const handleEdit = (issue) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Issues</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Filter by Category</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Road">Road</option>
          <option value="Garbage">Garbage</option>
        </select>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue._id} // ✅ use MongoDB _id
            className="border rounded-lg p-4 shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{issue.title}</h2>
              <p className="text-sm text-gray-600">
                Category: {issue.category} | Status:{" "}
                <span
                  className={`font-bold ${
                    issue.status === "Pending"
                      ? "text-yellow-600"
                      : issue.status === "In-Progress"
                      ? "text-blue-600"
                      : issue.status === "Resolved"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {issue.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Location: {issue.location}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {issue.status === "Pending" && (
                <button
                  onClick={() => handleEdit(issue)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
              )}
              <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1">
                <FaTrash /> Delete
              </button>
              <Link
                to={`/issue-details/${issue._id}`} // ✅ navigate by _id
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
              >
                <FaEye /> View
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal (UI only) */}
      {showModal && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Issue</h2>
            <form className="space-y-4">
              <input
                type="text"
                defaultValue={selectedIssue.title}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                defaultValue={selectedIssue.description}
                className="w-full border rounded px-3 py-2"
              />
              <select
                defaultValue={selectedIssue.category}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Streetlight">Streetlight</option>
                <option value="Road">Road</option>
                <option value="Garbage">Garbage</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
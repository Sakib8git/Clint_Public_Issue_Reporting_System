import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import Container from "../../../../components/Shared/Container";

const AdminIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");
  const queryClient = useQueryClient();

  const axiosSecure = useAxiosSecure();

  // ✅ Fetch all issues
  const {
    data: issues = [],
    isLoading: issuesLoading,
    isError: issuesError,
  } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports`
      );
      return res.data;
    },
  });

  // ✅ Fetch staff list from backend
  const {
    data: staffList = [],
    isLoading: staffLoading,
    isError: staffError,
  } = useQuery({
    queryKey: ["staff-list"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/staff`
      );
      return res.data;
    },
  });

  // ✅ Assign mutation
  const assignMutation = useMutation({
    mutationFn: async ({ issueId, staff }) => {
      const res = await axiosSecure.put(`/reports/${issueId}/assign`, {
        staffName: staff,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Staff assigned!");
      setSelectedIssue(null);
      setSelectedStaff("");
      queryClient.invalidateQueries(["all-issues"]); // refresh issues list
    },
  });

  // ✅ Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (issueId) => {
      const res = await axiosSecure.put(`/reports/${issueId}/reject`);
      return res.data;
    },
    onSuccess: () => {
      toast.error("Issue rejected!");
      queryClient.invalidateQueries(["all-issues"]);
    },
  });

  // ✅ Reject handler with confirmation
  const handleRejectIssue = (issueId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(issueId);
        Swal.fire({
          title: "Rejected!",
          text: `Issue ${issueId} has been rejected.`,
          icon: "success",
        });
      }
    });
  };

  if (issuesLoading || staffLoading) return <LoadingSpinner />;
  if (issuesError || staffError)
    return <p className="text-red-500">Failed to load data</p>;

  // ✅ Sort boosted issues first
  const sortedIssues = [...issues].sort(
    (a, b) => (b.boosted ? 1 : 0) - (a.boosted ? 1 : 0)
  );

  return (
    <Container>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Issues</h1>

        {/* Table */}
        <table className="w-full text-left">
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
                key={issue._id}
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
                  {/* Assign Staff button only if status is pending */}
                  {issue.status?.toLowerCase() === "pending" &&
                    !issue.assignedStaff && (
                      <button
                        onClick={() => setSelectedIssue(issue._id)}
                        className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-700"
                      >
                        Assign Staff
                      </button>
                    )}

                  {/* Reject button only if status is pending */}
                  {issue.status?.toLowerCase() === "pending" && (
                    <button
                      onClick={() => handleRejectIssue(issue._id)}
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
                {staffList.map((staff) => (
                  <option key={staff._id} value={staff.name}>
                    {staff.name}
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
                  onClick={() =>
                    assignMutation.mutate({
                      issueId: selectedIssue,
                      staff: selectedStaff,
                    })
                  }
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
    </Container>
  );
};

export default AdminIssues;

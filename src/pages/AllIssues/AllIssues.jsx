import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";
import IssueCard from "../../components/Home/IssueCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const limit = 8;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["issues", page, search, status, priority, category],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${
          import.meta.env.VITE_API_URL
        }/reports-paginated?page=${page}&limit=${limit}&search=${search}&status=${status}&priority=${priority}&category=${category}`
      );
      return res.data;
    },
    keepPreviousData: true,
    enabled: true, // ✅ always run when queryKey changes
  });

  const issues = data?.issues || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load issues</p>;

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        {/* ✅ Search + Filter UI */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset page when searching
            }}
            className="border px-3 py-2 rounded w-full sm:w-1/3"
          />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="working">Working</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Priority</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
          </select>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Category</option>
            <option value="Road">Road</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Water">Water</option>
            <option value="Garbage">Garbage</option>
          </select>
        </div>

        {/* ✅ Issue Cards */}
        <IssueCard issues={issues} />

        {/* ✅ Pagination */}
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default AllIssues;

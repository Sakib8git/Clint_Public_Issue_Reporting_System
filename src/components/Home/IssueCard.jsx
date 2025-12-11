import React from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Container from "../Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";

const IssuesCard = () => {
  const axiosSecure = useAxiosSecure();

 
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports-paginated`
      );
      return res.data; 
    },
  });

  const issues = data?.issues || [];

  const handleUpvote = async (id) => {
    try {
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/reports/${id}/upvote`
      );

      if (res.data.result?.modifiedCount > 0) {
        toast.success("Upvoted successfully!");
        refetch(); 
      } else {
        toast.error(res.data.message || "Already upvoted");
      }
    } catch (err) {
      toast.error("Failed to upvote");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load issues</p>;

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">All Issues: {issues.length} </h1>
      {issues && issues.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="rounded-lg shadow-md overflow-hidden bg-white"
            >
              {/* Image */}
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-40 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{issue.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Category: {issue.category}
                </p>
                <p className="text-sm mb-1">
                  Status:{" "}
                  <span className="font-bold text-blue-600">
                    {issue.status}
                  </span>
                </p>
                <p className="text-sm mb-1">
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
                <p className="text-sm text-gray-600 mb-1">
                  Location: {issue.location}
                </p>

                {/* Description */}
                {issue.description && (
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    {issue.description}
                  </p>
                )}

                {/* Reporter Info */}
                {issue.reporter && (
                  <p className="text-xs text-gray-500">
                    Reported by: {issue.reporter.name} ({issue.reporter.email})
                  </p>
                )}

                {/* Footer: Upvote + View Details */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleUpvote(issue._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    👍🏻Upvote ({issue.upvote || 0})
                  </button>
                  <Link
                    to={`/issue-details/${issue._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No issues found</p>
      )}
    </Container>
  );
};

export default IssuesCard;

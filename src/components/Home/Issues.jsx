import React from "react";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import IssueCard from "./IssueCard ";


const Issues = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["issues"], // ✅ generic query key
    queryFn: async () => {
      const result = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports`
      );
      console.log("Fetched Issues:", result.data); // ✅ check DB data
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load issues</p>;

  return (
    <Container>
      {issues && issues.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-12">No issues found</p>
      )}
    </Container>
  );
};

export default Issues;

import React from "react";
import IssueCard from "./IssueCard";

const LatestResolvedIssues = () => {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-bold mb-6 text-green-700">
        Latest Resolved Issue
      </h2>

      <IssueCard></IssueCard>
    </div>
  );
};

export default LatestResolvedIssues;

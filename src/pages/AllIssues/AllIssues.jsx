import React from "react";
import Container from "../../components/Shared/Container";
import IssueCard from "../../components/Home/IssueCard";

const AllIssues = () => {
  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Issues</h1>

        {/* Issue Cards */}
        <div>
          <IssueCard />
        </div>
      </div>
    </Container>
  );
};

export default AllIssues;

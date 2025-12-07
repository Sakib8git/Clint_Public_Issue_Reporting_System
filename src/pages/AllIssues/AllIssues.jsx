import React from "react";
import Container from "../../components/Shared/Container";
import IssueCard from "../../components/Home/IssueCard ";

const AllIssues = () => {
  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Issues</h1>

        {/* Issue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IssueCard />
        </div>
      </div>
    </Container>
  );
};

export default AllIssues;

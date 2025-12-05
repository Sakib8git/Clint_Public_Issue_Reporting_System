import React from "react";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white">
      {/* Image */}
      <img
        src={issue.image}
        alt={issue.title}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{issue.title}</h3>
        <p className="text-sm text-gray-600">Category: {issue.category}</p>
        <p className="text-sm">
          Status:{" "}
          <span className="font-bold text-blue-600">{issue.status}</span>
        </p>
        <p className="text-sm">
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
        <p className="text-sm text-gray-600">Location: {issue.location}</p>

        {/* Footer: Upvote + View Details */}
        <div className="flex justify-between items-center mt-4">
          <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
            👍 Upvote ({issue.upvotes})
          </button>
          <Link
            to={`/issue/${issue.id}`}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
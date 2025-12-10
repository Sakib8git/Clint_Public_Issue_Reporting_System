const IssueCard = ({ issues }) => {
  return (
    <>
  <h1 className="text-2xl font-bold mb-6">All Issues: {issues.length} </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {issues.map((issue) => (
        <div
          key={issue._id}
          className="rounded-lg shadow-md overflow-hidden bg-white"
        >
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">{issue.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Category: {issue.category}
            </p>
            <p className="text-sm mb-1">
              Status:{" "}
              <span className="font-bold text-blue-600">{issue.status}</span>
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
          </div>
        </div>
      ))}
    </div>
    </>
    
  );
};

export default IssueCard;

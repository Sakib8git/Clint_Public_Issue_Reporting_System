import React from "react";
import { useNavigate, useParams } from "react-router"; // jemon tumi chaicho
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaBolt } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const IssueDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: issue,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/reports/${id}`
      );
      return res.data;
    },
  });
  

const handleDelete = async () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(
          `${import.meta.env.VITE_API_URL}/reports/${id}`
        );

        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your issue has been deleted.",
            icon: "success"
          });
          toast.success("Issue deleted successfully!");
          navigate("/"); // ✅ redirect after delete
        } else {
          Swal.fire({
            title: "Not Authorized",
            text: "You cannot delete this issue.",
            icon: "error"
          });
          toast.error("You are not authorized to delete this issue!");
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete issue.",
          icon: "error"
        });
        toast.error("Failed to delete issue");
      }
    }
  });
};
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load issue</p>;

  const canEdit =
    issue.reporter?.email === user?.email && issue.status === "Pending";
  const canDelete = issue.reporter?.email === user?.email;
  const canBoost = !issue.boosted;

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        {/* Issue Header */}
        <h1 className="text-3xl font-bold mb-6">{issue.title}</h1>

        {/* Flex Layout: Image Left + Info Right */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-[336px] object-cover rounded-lg shadow"
            />
          </div>

          {/* Info */}
          <div className="md:w-1/2 bg-white shadow rounded-lg p-6 flex flex-col justify-between">
            <div>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {issue.category}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    issue.status === "Pending"
                      ? "bg-yellow-500"
                      : issue.status === "In-Progress"
                      ? "bg-blue-500"
                      : issue.status === "Resolved"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {issue.status}
                </span>
              </p>
              <p>
                <span className="font-semibold ">Priority:</span>{" "}
                <span className="text-green-600 font-semibold">
                  {" "}
                  {issue.priority}
                </span>
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {issue.location}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {issue.description}
              </p>
              {issue.createdAt && (
                <p>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(issue.createdAt).toLocaleString()}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6">
              <div className="flex gap-4 mb-4">
                {canEdit && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    <FaEdit /> Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FaTrash /> Delete
                  </button>
                )}
              </div>
              {canBoost && (
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                  <FaBolt /> Boost Priority (100৳)
                </button>
              )}
            </div>
          </div>
        </div>
        {issue.reporter && (
          <div className="bg-white shadow rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-2">Reported By</h2>
            <p>
              <span className="font-semibold">Name:</span> {issue.reporter.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {issue.reporter.email}
            </p>
          </div>
        )}
        {/* Staff Info */}
        {/* Staff Info */}

        <div className="bg-gray-100 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-2">Assigned Staff</h2>
          <p>
            <span className="font-semibold">Name:</span> John Doe
          </p>
          <p>
            <span className="font-semibold">Role:</span> Road Maintenance
            Supervisor
          </p>
          <p>
            <span className="font-semibold">Contact:</span> john.doe@city.gov
          </p>
          <p>
            <span className="font-semibold">Assigned On:</span> 12/7/2025, 6:45
            PM
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Assigned by{" "}
            <span className="font-semibold text-blue-600">Admin Panel</span>
          </p>
        </div>

        {/* {issue.staff && (
          <div className="bg-gray-100 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-2">Assigned Staff</h2>
            <p>
              <span className="font-semibold">Name:</span> John Doe
            </p>
            <p>
              <span className="font-semibold">Role:</span> Road Maintenance
              Supervisor
            </p>
            <p>
              <span className="font-semibold">Contact:</span> john.doe@city.gov
            </p>
            <p>
              <span className="font-semibold">Assigned On:</span> 12/7/2025,
              6:45 PM
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Assigned by{" "}
              <span className="font-semibold text-blue-600">Admin Panel</span>
            </p>
          </div>
        )} */}
      </div>
    </Container>
  );
};

export default IssueDetails;

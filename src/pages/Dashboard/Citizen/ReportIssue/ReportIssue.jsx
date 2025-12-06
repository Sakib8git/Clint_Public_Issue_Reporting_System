import React from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../../../components/Shared/Button/Button";
import Container from "../../../../components/Shared/Container";
import FileUpload from "../../../../components/Form/FileUpload/FileUpload";

const ReportIssue = () => {
  const navigate = useNavigate();

  const user = {
    role: "citizen",
    subscription: "free",
    issuesCount: 2,
    name: "Nazmus Sakib",
    email: "nazmus@example.com",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    // ✅ Show success toast
    toast.success("Issue submitted successfully!");

    // ✅ Reset form
    reset();

    // ✅ Navigate to My Issues page
    navigate("/dashboard/my-issues");
  };

  const isFreeLimitReached =
    user.subscription === "free" && user.issuesCount >= 3;

  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Report New Issue</h1>

        {isFreeLimitReached ? (
          <div className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-lg">
            <p className="mb-4">
              Free users can report a maximum of <strong>3 issues</strong>.
            </p>
            <Button
              label="Subscribe to Premium"
              onClick={() => navigate("/dashboard/profile")}
            />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow rounded-lg p-6 space-y-4"
          >
            {/* Name */}
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                defaultValue={user.name}
                readOnly
                {...register("name")}
                className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                {...register("email")}
                className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full border rounded px-3 py-2"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full border rounded px-3 py-2"
                rows="4"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Category</option>
                <option value="Streetlight">Streetlight</option>
                <option value="Road">Road</option>
                <option value="Garbage">Garbage</option>
                <option value="Water">Water</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-1">Location</label>
              <select
                {...register("location", { required: "Location is required" })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Division</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Khulna">Khulna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Barishal">Barishal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Upload Image */}
            <div>
              <FileUpload label="Upload Image" register={register("image")} />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" label="Submit Issue" />
            </div>
          </form>
        )}
      </div>
    </Container>
  );
};

export default ReportIssue;
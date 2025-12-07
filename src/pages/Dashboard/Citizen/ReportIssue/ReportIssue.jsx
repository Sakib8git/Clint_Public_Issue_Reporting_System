import React from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../../../components/Shared/Button/Button";
import Container from "../../../../components/Shared/Container";
import FileUpload from "../../../../components/Form/FileUpload/FileUpload";
import useAuth from "../../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { imageUplode } from "../../../../utils";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
// import axios from "axios";

const ReportIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => {
      return await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/reports`,
        payload
      );
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Issue reported successfully!");
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to submit issue!");
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, description, image, category, location } = data;
    const imageFile = image[0];

    try {
      const imageUrl = await imageUplode(imageFile);

      const reportData = {
        image: imageUrl,
        title,
        description,
        location,
        category,
        status: "Pending",
        priority: "Normal",
        upvote: 0,
        reporter: {
          email: user?.email,
          name: user?.displayName,
          image: user?.photoURL,
        },
      };

      await mutateAsync(reportData);

      // ✅ Reset form
      reset();

      // ✅ Navigate to My Issues page
      navigate("/dashboard/my-issues");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const isFreeLimitReached =
    user?.subscription === "free" && user?.issuesCount >= 3;

  if (isPending) return <LoadingSpinner />;
  if (isError) return <p>Error submitting issue</p>;

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
                defaultValue={user?.displayName}
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
                defaultValue={user?.email}
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

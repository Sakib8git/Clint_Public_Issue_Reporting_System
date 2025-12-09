import React, { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import StaffModal from "../../../../components/Modal/StaffModal";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const ManageStaff = () => {
  const auth = getAuth();
  const axiosSecure = useAxiosSecure();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    password: "",
    role: "staff",
  });

  // ✅ Fetch staff list from DB
  const {
    data: staffList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/staff`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading staff...</p>;

  //Add Staff
  const handleAddStaff = async () => {
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      // 1️⃣ Firebase Auth user create
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 2️⃣ Profile update
      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: formData.photo,
      });

      // 3️⃣ Save in DB
      const staffData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photo: formData.photo,
        role: "staff",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/staff`,
        staffData
      );

      if (res.data.insertedId) {
        toast.success("Staff added successfully!");
        refetch();
        setShowAddModal(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          photo: "",
          password: "",
          role: "staff",
        });
      }
    } catch (err) {
      console.error("Add staff error:", err);
      toast.error(err?.message || "Failed to add staff");
    }
  };

  // Update Staff
  const handleUpdateStaff = async () => {
    try {
      if (!formData._id) {
        toast.error("Invalid staff record");
        return;
      }
      const updatePayload = {
        name: formData.name,
        phone: formData.phone,
      };
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/staff/${formData._id}`,
        updatePayload
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Staff updated successfully!");
        refetch();
        setShowUpdateModal(false);
      }
    } catch (err) {
      toast.error("Failed to update staff");
    }
  };

  // Delete Staff
  const handleDeleteStaff = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This staff will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `${import.meta.env.VITE_API_URL}/staff/${id}`
          );

          if (res?.data?.deletedCount > 0) {
            Swal.fire("Deleted!", "Staff has been removed.", "success");
            refetch();
          } else {
            toast.error("No staff found to delete");
          }
        } catch (err) {
          console.error("Delete staff error:", err);
          toast.error("Failed to delete staff");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Staff</h1>

      {/* Add Staff Button */}
      <button
        onClick={() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            photo: "",
            password: "",
            role: "staff",
          });
          setShowAddModal(true);
        }}
        className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700 mb-4"
      >
        Add Staff
      </button>

      {/* Staff Table */}
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Photo</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff._id}>
              <td className="p-2">
                {staff.photo ? (
                  <img
                    src={staff.photo}
                    alt={staff.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                    No Photo
                  </div>
                )}
              </td>
              <td className="p-2">{staff.name}</td>
              <td className="p-2">{staff.email}</td>
              <td className="p-2">{staff.phone}</td>
              <td className="p-2 capitalize">{staff.role}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => {
                    setFormData(staff);
                    setShowUpdateModal(true);
                  }}
                  className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteStaff(staff._id)}
                  className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Staff Modal */}
      <StaffModal
        isOpen={showAddModal}
        close={() => setShowAddModal(false)}
        title="Add Staff"
        fields={["name", "email", "phone", "photo", "password", "role"]}
        formData={formData}
        setFormData={setFormData}
        onConfirm={handleAddStaff}
      />

      {/* Update Staff Modal (only name + phone) */}
      <StaffModal
        isOpen={showUpdateModal}
        close={() => setShowUpdateModal(false)}
        title="Update Staff"
        fields={["name", "phone"]}
        formData={formData}
        setFormData={setFormData}
        onConfirm={handleUpdateStaff}
      />
      {/* <StaffModal
        isOpen={showUpdateModal}
        close={() => setShowUpdateModal(false)}
        title="Update Staff"
        // ✅ Only name + phone editable, email readonly
        fields={["name", "phone", "email"]}
        formData={formData}
        setFormData={setFormData}
        onConfirm={handleUpdateStaff}
      /> */}
    </div>
  );
};

export default ManageStaff;

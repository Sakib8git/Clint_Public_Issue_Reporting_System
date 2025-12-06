import React, { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import StaffModal from "../../../../components/Modal/StaffModal";

const dummyStaff = [
  {
    id: "STAFF001",
    name: "Staff A",
    email: "staffa@example.com",
    phone: "0123456789",
    photo: "https://via.placeholder.com/50",
    role: "staff",
  },
  {
    id: "STAFF002",
    name: "Staff B",
    email: "staffb@example.com",
    phone: "0987654321",
    photo: "https://via.placeholder.com/50",
    role: "staff",
  },
];

const ManageStaff = () => {
  const [staffList, setStaffList] = useState(dummyStaff);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    password: "",
  });

  // Handle Add Staff
  const handleAddStaff = () => {
    const newStaff = {
      id: `STAFF${staffList.length + 1}`,
      ...formData,
      role: "staff",
    };
    setStaffList([...staffList, newStaff]);
    toast.success("Staff added successfully!");
    setShowAddModal(false);
    setFormData({ name: "", email: "", phone: "", photo: "", password: "" });
    console.log("Firebase Auth + DB save:", newStaff);
  };

  // Handle Update Staff
  const handleUpdateStaff = () => {
    const updated = staffList.map((s) =>
      s.id === formData.id ? { ...s, ...formData } : s
    );
    setStaffList(updated);
    toast.success("Staff updated successfully!");
    setShowUpdateModal(false);
    console.log("DB updated:", formData);
  };

  // Handle Delete Staff
  const handleDeleteStaff = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This staff will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = staffList.filter((s) => s.id !== id);
        setStaffList(updated);
        Swal.fire("Deleted!", "Staff has been removed.", "success");
        console.log("DB deleted:", id);
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Staff</h1>

      {/* Add Staff Button */}
      <button
        onClick={() => {
          setFormData({ name: "", email: "", phone: "", photo: "", password: "" });
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
            <tr key={staff.id}>
              <td className="p-2">
                <img
                  src={staff.photo}
                  alt={staff.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
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
                  onClick={() => handleDeleteStaff(staff.id)}
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
        fields={["name", "email", "phone", "photo", "password"]}
        formData={formData}
        setFormData={setFormData}
        onConfirm={handleAddStaff}
      />

      {/* Update Staff Modal */}
      <StaffModal
        isOpen={showUpdateModal}
        close={() => setShowUpdateModal(false)}
        title="Update Staff"
        fields={["name", "email", "phone", "photo"]}
        formData={formData}
        setFormData={setFormData}
        onConfirm={handleUpdateStaff}
      />
    </div>
  );
};

export default ManageStaff;
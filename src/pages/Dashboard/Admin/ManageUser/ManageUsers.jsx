import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  // ✅ Fetch users from backend (citizen collection)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get(
          `${import.meta.env.VITE_API_URL}/citizen`
        );
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const handleBlockToggle = (userId, currentAction) => {
    const newAction = currentAction === "block" ? "unblock" : "block";

    Swal.fire({
      title: `Are you sure you want to ${newAction} this user?`,
      text: "This action can be reverted later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${newAction} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ Patch request to backend
        axiosSecure
          .patch(`/citizen/${userId}`, { action: newAction })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              // update local state
              const updated = users.map((user) =>
                user._id === userId ? { ...user, action: newAction } : user
              );
              setUsers(updated);

              Swal.fire({
                title: "Success!",
                text: `User has been ${newAction}ed.`,
                icon: "success",
              });

              toast.success(`User ${userId} ${newAction}ed`);
              console.log(`DB updated: ${userId} ${newAction}ed`);
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update user in DB");
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className={user.status === "blocked" ? "bg-red-50" : ""}
            >
              <td className="p-2">{user._id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 capitalize">{user.role}</td>
              <td className="p-2 capitalize flex items-center gap-2">
                {/* status text */}
                {user.status === "premium" ? (
                  <span className="px-2 py-1 text-xs font-semibold bg-yellow-400 text-white rounded-full">
                    Premium
                  </span>
                ) : (
                  user.status || "active"
                )}
              </td>

              <td className="p-2">
                <button
                  onClick={() =>
                    handleBlockToggle(user._id, user.action || "unblock")
                  }
                  className={`px-3 py-1 rounded text-white ${
                    user.action === "block"
                      ? "bg-green-500 hover:bg-green-700"
                      : "bg-red-500 hover:bg-red-700"
                  }`}
                >
                  {user.action === "block" ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;

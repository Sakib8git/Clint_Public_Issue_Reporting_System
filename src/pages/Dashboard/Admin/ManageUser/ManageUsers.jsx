import React, { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const dummyUsers = [
  {
    id: "USER001",
    name: "Nazmus Sakib",
    email: "nazmus@example.com",
    subscription: "free",
    status: "active",
  },
  {
    id: "USER002",
    name: "Rahim Uddin",
    email: "rahim@example.com",
    subscription: "premium",
    status: "blocked",
  },
  {
    id: "USER003",
    name: "Karim Ali",
    email: "karim@example.com",
    subscription: "free",
    status: "active",
  },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(dummyUsers);

  const handleBlockToggle = (userId, currentStatus) => {
    const action = currentStatus === "blocked" ? "unblock" : "block";

    Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      text: "This action can be reverted later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = users.map((user) =>
          user.id === userId
            ? { ...user, status: action === "block" ? "blocked" : "active" }
            : user
        );
        setUsers(updated);

        Swal.fire({
          title: "Success!",
          text: `User has been ${action}ed.`,
          icon: "success",
        });

        toast.success(`User ${userId} ${action}ed`);
        console.log(`DB updated: ${userId} ${action}ed`);
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
            <th className="p-2">Subscription</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={user.status === "blocked" ? "bg-red-50" : ""}
            >
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 capitalize">{user.subscription}</td>
              <td className="p-2 capitalize">{user.status}</td>
              <td className="p-2">
                <button
                  onClick={() => handleBlockToggle(user.id, user.status)}
                  className={`px-3 py-1 rounded text-white ${
                    user.status === "blocked"
                      ? "bg-green-500 hover:bg-green-700"
                      : "bg-red-500 hover:bg-red-700"
                  }`}
                >
                  {user.status === "blocked" ? "Unblock" : "Block"}
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
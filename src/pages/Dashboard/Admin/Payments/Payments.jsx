import React, { useState } from "react";

const dummyPayments = [
  {
    id: "PAY001",
    user: "Nazmus Sakib",
    amount: 1000,
    method: "Stripe",
    status: "success",
    date: "2025-12-01",
  },
  {
    id: "PAY002",
    user: "Rahim Uddin",
    amount: 500,
    method: "Bkash",
    status: "pending",
    date: "2025-12-02",
  },
  {
    id: "PAY003",
    user: "Karim Ali",
    amount: 1200,
    method: "Paypal",
    status: "failed",
    date: "2025-12-03",
  },
];

const Payments = () => {
  const [payments, setPayments] = useState(dummyPayments);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredPayments = payments
    .filter((p) => (filterStatus ? p.status === filterStatus : true))
    .filter((p) => (filterMethod ? p.method === filterMethod : true))
    .filter((p) => (filterDate ? p.date === filterDate : true));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Filter by Method</option>
          <option value="Stripe">Stripe</option>
          <option value="Bkash">Bkash</option>
          <option value="Paypal">Paypal</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Table */}
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Payment ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Method</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment.id}>
              <td className="p-2">{payment.id}</td>
              <td className="p-2">{payment.user}</td>
              <td className="p-2">{payment.amount} tk</td>
              <td className="p-2">{payment.method}</td>
              <td
                className={`p-2 capitalize ${
                  payment.status === "success"
                    ? "text-green-600"
                    : payment.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {payment.status}
              </td>
              <td className="p-2">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
